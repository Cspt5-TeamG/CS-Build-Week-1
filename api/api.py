from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from adventure.models import *


@csrf_exempt
@api_view(['GET'])
def rooms(request):
    rooms = Room.objects.all()
    return JsonResponse({'rooms': list(rooms.values())})
