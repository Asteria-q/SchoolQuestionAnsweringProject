from django.urls import reverse
from simpleui.menu import Group, Item

menu_list = [
    Group(
        '用户管理',
        icon='fa fa-user',
        children=[
            Item('用户列表', reverse('admin:auth_user_changelist')),
        ]
    ),
    Group(
        '问答管理',
        icon='fa fa-file-text-o',
        children=[
            Item('问题列表', reverse('admin:myApp_question_changelist')),
            Item('回答列表', reverse('admin:myApp_answer_changelist')),
        ]
    ),
]