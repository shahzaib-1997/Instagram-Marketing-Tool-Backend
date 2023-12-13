"""
Module: renderers

This module defines a custom renderer for rendering API responses in JSON format with specific handling for errors.

Classes:
    - UserRenderers: Custom renderer extending rest_framework.renderers.JSONRenderer.

Usage:
    This renderer is intended to be used in a Django REST Framework project to customize the JSON rendering
    behavior for API responses. It checks if the data contains "ErrorDetail" and formats the response accordingly.

Example:
    >>> from renderers import UserRenderers

    # Create an instance of UserRenderers
    >>> user_renderer = UserRenderers()

    # Render a response data
    >>> response_data = {"key": "value"}
    >>> rendered_response = user_renderer.render(response_data)

    # Display the rendered response
    >>> print(rendered_response)
    '{"key": "value"}'
"""
import json
from rest_framework import renderers


class UserRenderers(renderers.JSONRenderer):
    """
    Custom renderer extending rest_framework.renderers.JSONRenderer.
    This class provides customization for rendering API responses in JSON format.
    """
    charset = "utf-8"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        """
        Renders the API response data.

        Args:
            - data: The data to be rendered.
            - accepted_media_type: The accepted media type.
            - renderer_context: The context of the renderer.

        Returns:
            str: The rendered JSON response.

        Note:
            If the data contains "ErrorDetail," the response is formatted with an "errors" key.
        """
        if "ErrorDetail" in str(data):
            response = json.dumps({"errors": data})
        else:
            response = json.dumps(data)

        return response
