from rest_framework import permissions
from django.contrib.auth.models import Group
from rest_framework import exceptions


class IsOwnerHasPermissionOrReadOnly(permissions.DjangoModelPermissions):
    """
    Custom permission to only allow owners, superusers and users or groups with permission
    to model of an object to edit it.
    """

    def has_permission(self, request, view):

        return True

    def has_object_permission(self, request, view, obj):

        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        queryset = self._queryset(view)
        perms = self.get_required_permissions(request.method, queryset.model)

        # Checks for user's access (or user's group access) to model as maintained in admin
        if request.user.has_perms(perms):
            return True

        # Allows user to access own object
        if obj.owner == request.user:
            return True

        return False
