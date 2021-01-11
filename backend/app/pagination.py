from django.conf import settings
from rest_framework import pagination
from rest_framework.response import Response


class Pagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        current_page = 1
        if self.page.has_next():
            current_page = self.page.next_page_number()-1
        elif self.page.has_previous():
            current_page = self.page.previous_page_number()+1
        else:
            current_page = 1

        if self.page.has_next():
            next_page = self.page.next_page_number()
        else:
            next_page = None

        if self.page.has_previous():
            previous_page = self.page.previous_page_number()
        else:
            previous_page = None

        return Response({
            'next': next_page,
            'previous': previous_page,
            'current_page': current_page,
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })
