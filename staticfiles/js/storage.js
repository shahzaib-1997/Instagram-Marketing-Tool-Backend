(() => {
	const syncer = {
		trackerFrame: undefined,

		events: new EventTarget(),

		id: () => btoa(Date.now() % 13432543435).split("=").join(""),

		messageQueue: [],
		trackerReady: false,

		storage: {
			params: {},
			cookies: {},
			gaClientID: null
		},

		getSearchParams: () => {
			const url = window.location;
			const query = new window.URLSearchParams(url.search);
			const params = Array.from(query.entries());

			const paramsMap = {};

			params.forEach(param => {
				paramsMap[param[0]] = paramsMap[param[0]] || [];

				paramsMap[param[0]].push(param[1]);
			});

			return paramsMap;
		},

		getCookies: () => {
			const cookies = document.cookie.split(";");

			const cookiesMap = {};

			cookies.forEach(cookie => {
				const cookieParams = cookie.trim().split("=");

				const name = cookieParams[0];
				const value = cookieParams.slice(1).join("=");

				cookiesMap[name] = cookiesMap[name] || [];
				cookiesMap[name].push(value);
			});

			return cookiesMap;
		},

		getGAClientID: () => {
			const cookies = syncer.getCookies();

			if(cookies["_ga"] === undefined) {
				return null;
			}

			const GA = cookies["_ga"][0];

			if(GA.split(".").length !== 4) {
				return null;
			}

			const [GAVersion, GADepth, GAID, GATimestamp] = GA.split(".");

			return {
				version: GAVersion,
				depth: GADepth,
				id: `${GAID}.${GATimestamp}`,
				timestamp: new Date(GATimestamp * 1000)
			};
		},

		getGASessionID: () => {
			const cookies = syncer.getCookies();

			const sessionIDs = Object.keys(cookies)
				.filter(cookie => cookie.indexOf("_ga_") === 0)
				.map(cookie => {
					const GT = cookie.slice(4);

					const value = cookies[cookie][0];

					if(value.split(".").length != 9) {
						return;
					}

					const [GSVersion, GSDepth, GSSessionStart, GSSessionCount, GSEngagementSession, GSCurrentTimestamp, GSCountdown, GSUndefined1, GSUndefined2] = value.split(".");

					return {
						measurement: GT,
						version: GSVersion,
						depth: GSDepth,
						session_start: GSSessionStart,
						session_count: GSSessionCount,
						engagement_session: GSEngagementSession,
						current_timestamp: GSCurrentTimestamp,
						countdown: GSCountdown,
						undefined1: GSUndefined1,
						undefined2: GSUndefined2
					}
				})
				.filter(ses => ses);

			return sessionIDs[0] || null;
		},

		heartbeat: () => {
			const data = {
				params: {
					...syncer.storage.params,
					...syncer.getSearchParams()
				},
				cookies: {
					...syncer.storage.cookies,
					...syncer.getCookies()
				},
				gaClientID: syncer.getGAClientID() || syncer.storage.gaClientID,
				gaSessionID: syncer.getGASessionID() || syncer.storage.gaSessionID
			};

			syncer.storage = data;

			syncer.sendCommand(JSON.parse(JSON.stringify({
				type: "set",
				data
			})));
		},

		watch: (destination, callback) => {
			let old = destination();

			const watch = () => {
				const newVal = destination();

				if(newVal != old) {
					callback();
				}

				old = newVal;
			};

			setInterval(watch, 100);
		},

		watchCookieChange: () => {
			syncer.watch(() => document.cookie, syncer.heartbeat);
		},

		watchLocationChange: () => {
			window.addEventListener("popstate", syncer.heartbeat);

			const originalPushState = window.history.pushState;

			window.history.pushState = (...args) => {
				originalPushState.call(window.history, ...args);

				try {
					syncer.heartbeat();
				} catch(e) {
					console.error(e);
				};
			};
		},

		injectTracker: () => {
			if(window.trackerURL === undefined) {
				return syncer.watch(() => window.trackerURL, syncer.injectTracker);
			}

			if(syncer.trackerFrame) {
				return;
			}

			const iframe = document.createElement("iframe");

			iframe.style.display = "none";
			iframe.src = window.trackerURL;

			syncer.trackerFrame = iframe;

			document.body.appendChild(iframe);
		},

		listenForMessages: () => {
			window.addEventListener("message", function(event) {
				if(syncer.trackerFrame && event.source == syncer.trackerFrame.contentWindow) {
					const message = JSON.parse(event.data);

					if(message.type == "ready") {
						const queue = syncer.messageQueue;

						syncer.messageQueue = [];

						queue.forEach(message => {
							syncer.trackerFrame.contentWindow.postMessage(JSON.stringify(message), "*");
						});

						syncer.trackerReady = true;
					}

					syncer.events.dispatchEvent(new CustomEvent(message.type, {
						detail: message
					}));
				}
			});
		},

		sendMessage: (message) => {
			if(syncer.trackerReady) {
				return syncer.trackerFrame.contentWindow.postMessage(JSON.stringify(message), "*");
			}

			syncer.messageQueue.push(message);
		},

		sendCommand: (message) => {
			const id = syncer.id();

			// TODO: implement timeout
			return new Promise((resolve, reject) => {
				const listener = (event) => {
					if(event.detail.id === id) {
						syncer.events.removeEventListener("response", listener)

						if(event.detail.reject) {
							return reject(event.detail.response);
						}

						resolve(event.detail.response);
					}
				};

				syncer.events.addEventListener("response", listener)

				syncer.sendMessage({
					type: "command",
					message,
					id
				});
			});
		},

		get: () => syncer.sendCommand({type: "get"})
	};

	syncer.heartbeat();

	syncer.watchCookieChange();
	syncer.watchLocationChange();

	syncer.listenForMessages();

	syncer.injectTracker();

	window.syncer = {
		get: syncer.get,
		set: (data) => {
			return syncer.sendCommand(JSON.parse(JSON.stringify({
				type: "set",
				data
			})));
		}
	};
})();
