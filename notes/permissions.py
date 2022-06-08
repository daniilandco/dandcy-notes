from rest_framework import permissions


class NotCreateAndIsAdminUser(permissions.IsAdminUser):
    def has_permission(self, request, view):
        return (view.action in ['update', 'partial_update', 'destroy', 'list']
                and super(NotCreateAndIsAdminUser, self).has_permission(request, view))


class CreateAndIsAuthenticated(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return (view.action == 'create'
                and super(CreateAndIsAuthenticated, self).has_permission(request, view))


class NotSafeMethodAndAllowAny(permissions.AllowAny):
    def has_permission(self, request, view):
        return (view.action not in ['update', 'partial_update', 'destroy', 'list', 'create']
                and super(NotSafeMethodAndAllowAny, self).has_permission(request, view))
