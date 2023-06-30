from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.db.models import Q

from myApp.models import User
from myApp.models import Question
from myApp.models import Answer
from myApp.models import Reported
from myApp.models import UserLike, KeyWord, Tag, KeyWord
from myApp.models import BitwiseAnd
from django.db.models.expressions import Func
from datetime import datetime

from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max
import requests

class Bin(Func):
    function = 'BIN'


import pymysql

FORMAT_DATETIME = '%Y/%m/%d %H:%M:%S'  # 定义时间字符串格式

# TAGS=["计算机","情感", "摄影", "艺术", "音乐", "数学"]
TAGS = ["求职", "考研", "保研", "指南", "活动", "失招", "二手", "情感", "TD", "航学", "好物"]
DISPLAYinfo = ['Sex', 'Profession', 'Grade', 'Tags']

def get_secret(request):
    return JsonResponse({'APPID': "wxc1b97a4755986de0",
                         'SECRET': "574e02973aebf445b115b346951da8b1"})

def report_list(request):
    reports = Reported.objects.all()
    return render(request, 'report_list.html', {'reports': reports})


def solve_report(request, report_rid):
    report = Reported.objects.get(RID=report_rid)
    if (report.Type == 0):
        question = Question.objects.get(QID=report.ID)
        # question.delete()
        # report.delete()
    else:
        answer = Answer.objects.get(AID=report.ID)
        # answer.delete()
        # report.delete()
    return render(request, 'success.html')


# Create your views here.
def hello_world(request):
    tt = request.GET.get('tt')
    return HttpResponse("buaa," + tt)


# 3.5 用户信息展示 / 3.1登录
def get_user_all_info(request):
    code = request.GET.get('code')
    url = "https://api.weixin.qq.com/sns/jscode2session"
    url += "?appid=wxc1b97a4755986de0"
    url += "&secret=574e02973aebf445b115b346951da8b1"
    url += "&js_code=" + code
    url += "&grant_type=authorization_code"
    r = requests.get(url)
    openid = r.json().get('openid', '')
    print(openid)
    if User.objects.filter(OpenID=openid).exists():
        user = User.objects.get(OpenID=openid)
        try:
            likeQ = UserLike.objects.filter(
                LikeUser=user, LikeType=0).values_list('LikeQuestion__QID',
                                                       flat=True)
            lQ = list(likeQ)
        except UserLike.DoesNotExist:
            lQ = []

        try:
            likeA = UserLike.objects.filter(
                LikeUser=user, LikeType=1).values_list('LikeAnswer__AID',
                                                       flat=True)
            lA = list(likeA)
        except UserLike.DoesNotExist:
            lA = []

        a = []
        a.append({
            'UID': user.UID,
            "openID": openid,
            "Image": user.Image,
            "UserName": user.UserName,
            "Sex": user.Sex,
            "Tags": numToTAGS(user.Tags),
            "SelfIntro": user.SelfIntro,
            "Grade": user.Grade,
            "Profession": user.Profession,
            "DisplayInfo": numToDisInfo(user.DisplayInfo),
            "likedQuestion": lQ,
            "likedAnswer": lA
        })
        print(numToTAGS(user.Tags))
        print(lA)
        print(lQ)
        return JsonResponse({'data': a})
    else:
        # 没有查询到数据
        name = "momo_" + openid[-4:]
        user = User(
            OpenID=openid,
            Sex=1,
            UserName=name,
            DisplayInfo=15,
            Tags=62,
            SelfIntro="这个人好懒呀",
            Grade="本科生",
            Image=
            "https://picsum.photos/200",
        )
        user.save()
        a = []
        a.append({
            'UID': user.UID,
            "openID": user.OpenID,
            "Image": user.Image,
            "UserName": user.name,
            "Sex": "1",
            "Tags": [],
            "SelfIntro": "这个人好懒呀~~",
            "Grade": "本科生",
            "Profession": "计算机科学与技术",
            "DisplayInfo": ["Tags", "Sex", "Grade", "Profession"],
        })

        return JsonResponse({'data': a})


def get_my_question(request):
    uid = int(request.GET.get('uid'))
    questions = Question.objects.filter(UID=uid)
    # user = User.objects.filter(UID=uid)
    data = []
    if (questions.exists()):
        for question in questions:
            # isLiked = False
            # if UserLike.objects.filter(LikeUser=user,LikeQuestion=question).exists():
            #     isLiked = True
             #########6.8##############
            # answer_count = Answer.objects.filter(QID=question).count()
            # question.AnswersNum = answer_count
            ########################
            data.append({
                'QID': question.QID,
                'QueTime': question.QueTime.strftime(FORMAT_DATETIME),
                'Title': question.Title,
                'QueContent': question.QueContent,
                'AnswersNum': question.AnswersNum,
                'ClickNum': question.ClickNum,
                'LikeNum': question.LikeNum,
                'Picture': question.Picture,
                'Tags': numToTAGS(question.Tags),
                'UID': question.UID.UID,
                'UserName': question.UID.UserName,
                # 'isLiked':isLiked,
                'Image': question.UID.Image
            })
            # print(numToTAGS(question.Tags))
        return JsonResponse({'data': data})
    else:
        return JsonResponse({'data': None})


def get_my_answer(request):
    uid = int(request.GET.get('uid'))
    answers = Answer.objects.filter(UID=uid)
    data = []
    if (answers.exists()):
        for answer in answers:
            data.append({
                'AID': answer.AID,
                'AnsTime': answer.AnsTime.strftime(FORMAT_DATETIME),
                'AnsContent': answer.AnsContent,
                'LikeNum': answer.LikeNum,
                'UID': answer.UID.UID,
                'QID': answer.QID.QID,
                'Title': answer.QID.Title,
                'QueContent': answer.QID.QueContent,
            })
            # print(answer.AID)
        return JsonResponse({'data': data})
    else:
        return JsonResponse({'data': None})


# 3.2 修改个人信息
#!!!!!!!!!!!!!!!!
@csrf_exempt
def edit_user_info(request):
    # if request.method == 'GET':
    # print(request.GET)
    uid = request.GET.get('uid')
    username = request.GET.get('username')
    sex = request.GET.get('sex')
    image = request.GET.get('image')
    grade = request.GET.get('grade')
    profession = request.GET.get('profession')
    selfintro = request.GET.get('selfintro')
    tag = request.GET.get('tag')
    # print(tag)

    tag_list = eval(tag)  #string to list
    tagNum = tagsToNum(tag_list)  #list to num
    print(tagNum)
    # 从数据库中查询用户信息
    user = User.objects.get(UID=uid)
    user.UserName = username
    user.Sex = sex
    user.Image = image
    user.Grade = grade
    user.Profession = profession
    user.SelfIntro = selfintro
    user.Tags = tagNum
    user.save()
    return JsonResponse({'success': 'edit user information'})


# else:
# return JsonResponse({'false':'false'})


# 3.3 个人隐私设置
@csrf_exempt
def edit_displayInfo(request):
    uid = int(request.GET.get('uid'))
    displayinfo = request.GET.get('displayinfo')

    # 从数据库中查询用户信息
    data = User.objects.get(UID=uid)
    displayinfo_list = eval(displayinfo)  #string to list
    print(displayinfo)
    print(displayinfo_list)
    displayinfoNum = displayinfoToNum(displayinfo_list)  #list to num
    print(displayinfoNum)
    data.DisplayInfo = displayinfoNum
    data.save()
    return JsonResponse({'success': 'edit display information'})


# 3.4 用户注销
def delete_user(request):
    uid = int(request.GET.get('uid'))
    user = User.objects.get(UID=uid)
    user.delete()
    return JsonResponse({'success': 'User deleted successfully.'})


# 4 获取热点问题
def get_hot_question(request):
    print('-----in hot----')
    # i = int(request.GET.get('i', 0))  #要哪十条 i=1：1-10          # i 从1开始
    # print(i)
    top_ten_questions = Question.objects.order_by('-ClickNum')[:10]
    data = []
    for question in top_ten_questions:
        #########6.8##############
        # answer_count = Answer.objects.filter(QID=question).count()
        # question.AnswersNum = answer_count
        ########################

        data.append({
            'QID': question.QID,
            'QueTime': question.QueTime.strftime(FORMAT_DATETIME),
            'Title': question.Title,
            'QueContent': question.QueContent,
            'AnswersNum': question.AnswersNum,
            'ClickNum': question.ClickNum,
            'LikeNum': question.LikeNum,
            'Picture': question.Picture,
            'Tags': numToTAGS(question.Tags),
            'UID': question.UID.UID,
            'UserName': question.UID.UserName,
            'Image': question.UID.Image
        })
    return JsonResponse({'data': data})


# 问题推荐  !!!!!!
def recommend_question(request):
    print('-------------------------')
    uid = int(request.GET.get('uid'))
    print(uid)
    user = User.objects.get(UID=uid)
    '''推荐： 根据tags 推荐相应的问题
    '''
    tags_num = user.Tags
    
    tags = numToTAGS(tags_num)
    print(tags)
    ######################6.13########################
    query = Q()
    # for tag in tags:
    #     query |= Q(Tags__icontains=tag)

    questions = Question.objects.filter(query).order_by('-LikeNum')
    # questions = Question.objects.order_by('-LikeNum')
    #######################6.13 end ############################
    data = []
    for question in questions:
        #  #########6.8##############
        # answer_count = Answer.objects.filter(QID=question).count()
        # question.AnswersNum = answer_count
        ########################
        data.append({
            'QID': question.QID,
            'QueTime': question.QueTime.strftime(FORMAT_DATETIME),
            'Title': question.Title,
            'QueContent': question.QueContent,
            'AnswersNum': question.AnswersNum,
            'ClickNum': question.ClickNum,
            'LikeNum': question.LikeNum,
            'Picture': question.Picture,
            'Tags': numToTAGS(question.Tags),
            'UID': question.UID.UID,
            'UserName': question.UID.UserName,
            'Image': question.UID.Image
        })
    return JsonResponse({'data': data})


# 4.2 浏览其他用户
def visit_other(request):
    uid = request.GET.get('uid')
    user = User.objects.get(UID=uid)
    displayinfo = numToDisInfo(user.DisplayInfo)
    print(user.DisplayInfo)
    print(displayinfo)
    data = [{
        'UID': user.UID,
        'OpenID': user.OpenID,
        'UserName': user.UserName,
        'Image': user.Image,
        'SelfIntro': user.SelfIntro,
    }]
    if ('Sex' in displayinfo):
        data[0]['Sex'] = user.Sex
    if ('Grade' in displayinfo):
        # data.append({'Grade': user.Grade})
        data[0]['Grade'] = user.Grade
    if ('Profession' in displayinfo):
        # data.append({'Profession': user.Profession})
        data[0]['Profession'] = user.Profession
    if ('Tags' in displayinfo):
        # data.append({'Tags': numToTAGS(user.Tags)})
        data[0]['Tags'] = numToTAGS(user.Tags)
    return JsonResponse({'data': data})
    # else :
    #     return JsonResponse({'failed': 'No user found'})


# 4.3 关键词检索问题(并排序)
def search_question(request):
    print("----------This is search_question------")
    searchword = request.GET.get('searchword')
    sortBy = request.GET.get('sortBy')

    print("searchword:" + searchword)
    print("sortBy:" + sortBy)

    # 构建查询条件，要求Title或Content属性包含关键词
    query = Q(Title__icontains=searchword) | Q(
        QueContent__icontains=searchword)

    questions = Question.objects.filter(query).order_by('-' + sortBy)

    #####6.9####################
    query_user = Q(UserName__icontains=searchword)

    users_user = User.objects.filter(query_user)

    # print(str(Question.objects.filter(query).order_by('-' + sortBy).query))

    data = []
    for user in users_user:
        # # que = Question.objects.filter(query)[0]
        # ques = Question.objects.filter(query)
        # if ques.exists():
        #     que = ques[0]
        # else:
        #     # 没查到对应的问题
        data.append({
            'QID': 0,
            'QueTime': " ",
            'Title': "   ",
            'QueContent': "  ",
            'AnswersNum': 0,
            'ClickNum': 0,
            'LikeNum': 0,
            'Picture': " ",
            'Tags': numToTAGS(user.Tags),
            'UID': user.UID,
            'UserName': user.UserName,
            'Image': user.Image
        })

    #########6.9 end#######################
    # data = []
    for question in questions:
        #  #########6.8##############
        # answer_count = Answer.objects.filter(QID=question).count()
        # question.AnswersNum = answer_count
        ########################
        data.append({
            'QID': question.QID,
            'QueTime': question.QueTime.strftime(FORMAT_DATETIME),
            'Title': question.Title,
            'QueContent': question.QueContent,
            'AnswersNum': question.AnswersNum,
            'ClickNum': question.ClickNum,
            'LikeNum': question.LikeNum,
            'Picture': question.Picture,
            'Tags': numToTAGS(question.Tags),
            'UID': question.UID.UID,
            'UserName': question.UID.UserName,
            'Image': question.UID.Image
        })
    return JsonResponse({'data': data})


# 4.4 按类别对问题排序
def sort_question(request):
    tag = request.GET.get('tag')
    sortBy = request.GET.get('sortBy')
    # i = int(request.GET.get('i', 0))  #要哪十条 i=1：1-10          # i 从1开始

    # tag_map = {"计算机": 6, "情感": 5, "摄影": 4,
    #             "艺术": 3, "音乐": 2, "数学": 1}
    tag_map = {
        "求职": 11,
        "考研": 10,
        "保研": 9,
        "指南": 8,
        "活动": 7,
        "失招": 6,
        "二手": 5,
        "情感": 4,
        "TD": 3,
        "航学": 2,
        "好物": 1
    }

    # 用户输入的二进制字符串从右向左第几位是1
    bit_index = tag_map[tag]

    # 构造正则表达式，匹配满足条件的二进制字符串
    regex_str = '^.*1[0-1]{%d}$' % (bit_index - 1)

    # 查询所有符合条件的问题项
    questions = Question.objects.annotate(tags_str=Bin('Tags'))
    questions = questions.filter(tags_str__iregex=regex_str).order_by('-QID')
    #[i,i+10]

    data = []
    for question in questions:
        #  #########6.8##############
        # answer_count = Answer.objects.filter(QID=question).count()
        # question.AnswersNum = answer_count
        ########################
        data.append({
            'QID': question.QID,
            'QueTime': question.QueTime.strftime(FORMAT_DATETIME),
            'Title': question.Title,
            'QueContent': question.QueContent,
            'AnswersNum': question.AnswersNum,
            'ClickNum': question.ClickNum,
            'LikeNum': question.LikeNum,
            'Picture': question.Picture,
            'Tags': numToTAGS(question.Tags),
            'UID': question.UID.UID,
            'UserName': question.UID.UserName,
            'Image': question.UID.Image
        })
    return JsonResponse({'data': data})


# 4.5
def new_question(request):
    uid = int(request.GET.get('uid'))
    quetime_str = request.GET.get('quetime')
    quetime = datetime.strptime(quetime_str, FORMAT_DATETIME)
    title = request.GET.get('title')
    quecontent = request.GET.get('quecontent')
    tag = request.GET.get('tag')

    picture = request.GET.get('picture')

    tag_list = eval(tag)  #string to list
    tagNum = tagsToNum(tag_list)  #list to num

    # 获取给定用户ID的用户对象
    user = User.objects.get(UID=uid)
    question = Question(QueTime=quetime,
                        Title=title,
                        QueContent=quecontent,
                        AnswersNum=0,
                        ClickNum=0,
                        LikeNum=0,
                        Tags=tagNum,
                        Picture=picture,
                        UID=user)
    question.save()
    return JsonResponse({'success': 'insert question'})


# 4.6
def new_answer(request):
    print("-------In the new_answer----------")
    uid = int(request.GET.get('uid'))
    qid = int(request.GET.get('qid'))
    anscontent = request.GET.get('anscontent')
    anstime_str = request.GET.get('anstime')
    anstime = datetime.strptime(anstime_str, FORMAT_DATETIME)
    print("uid:" + str(uid))
    print("qid:" + str(qid))
    print('anscontent:', anscontent)
    print(anstime)

    # 获取给定用户ID的用户对象
    user = User.objects.get(UID=uid)
    question = Question.objects.get(QID=qid)
    answer = Answer(AnsContent=anscontent,
                    AnsTime=anstime,
                    LikeNum=0,
                    QID=question,
                    UID=user)
    answer.save()
    question.AnswersNum += 1
    question.save()

    return JsonResponse({'success': 'insert answer'})


# 4.7（1） 问题操作——点赞
def answer_like(request):
    uid = int(request.GET.get('uid'))  #!!!
    user = User.objects.get(UID=uid)
    typ = int(request.GET.get('type'))
    id = int(request.GET.get('id'))
    action = int(request.GET.get('action'))  #点赞或是取消点赞 1是点赞 0是取消

    if (typ == 0):  # Question
        question = Question.objects.get(QID=id)
        if (action == 1):
            question.LikeNum = question.LikeNum + 1
            question.save()
            like = UserLike(LikeUser=user, LikeQuestion=question, LikeType=0)
            like.save()
            try:
                likeQ = UserLike.objects.filter(
                    LikeUser=user, LikeType=0).values_list('LikeQuestion__QID',
                                                           flat=True)
                lQ = list(likeQ)
            except UserLike.DoesNotExist:
                lQ = []

            try:
                likeA = UserLike.objects.filter(
                    LikeUser=user, LikeType=1).values_list('LikeAnswer__AID',
                                                           flat=True)
                lA = list(likeA)
            except UserLike.DoesNotExist:
                lA = []

            a = []
            a.append({
                'UID': user.UID,
                "Image": user.Image,
                "UserName": user.UserName,
                "Sex": user.Sex,
                "Tags": numToTAGS(user.Tags),
                "SelfIntro": user.SelfIntro,
                "Grade": user.Grade,
                "Profession": user.Profession,
                "DisplayInfo": numToDisInfo(user.DisplayInfo),
                "likedQuestion": lQ,
                "likedAnswer": lA
            })
            return JsonResponse({'data': a})
        else:
            question.LikeNum = question.LikeNum - 1
            question.save()
            UserLike.objects.filter(LikeUser=user,
                                    LikeQuestion=question,
                                    LikeType=0).delete()
            # return JsonResponse({'success': 'Delete Question like'})
            try:
                likeQ = UserLike.objects.filter(
                    LikeUser=user, LikeType=0).values_list('LikeQuestion__QID',
                                                           flat=True)
                lQ = list(likeQ)
            except UserLike.DoesNotExist:
                lQ = []

            try:
                likeA = UserLike.objects.filter(
                    LikeUser=user, LikeType=1).values_list('LikeAnswer__AID',
                                                           flat=True)
                lA = list(likeA)
            except UserLike.DoesNotExist:
                lA = []

            a = []
            a.append({
                'UID': user.UID,
                "Image": user.Image,
                "UserName": user.UserName,
                "Sex": user.Sex,
                "Tags": numToTAGS(user.Tags),
                "SelfIntro": user.SelfIntro,
                "Grade": user.Grade,
                "Profession": user.Profession,
                "DisplayInfo": numToDisInfo(user.DisplayInfo),
                "likedQuestion": lQ,
                "likedAnswer": lA
            })
            return JsonResponse({'data': a})
    else:
        answer = Answer.objects.get(AID=id)
        if (action == 1):
            answer.LikeNum = answer.LikeNum + 1
            answer.save()
            like = UserLike(LikeUser=user, LikeAnswer=answer, LikeType=1)
            like.save()
            try:
                likeQ = UserLike.objects.filter(
                    LikeUser=user, LikeType=0).values_list('LikeQuestion__QID',
                                                           flat=True)
                lQ = list(likeQ)
            except UserLike.DoesNotExist:
                lQ = []

            try:
                likeA = UserLike.objects.filter(
                    LikeUser=user, LikeType=1).values_list('LikeAnswer__AID',
                                                           flat=True)
                lA = list(likeA)
            except UserLike.DoesNotExist:
                lA = []

            a = []
            a.append({
                'UID': user.UID,
                "Image": user.Image,
                "UserName": user.UserName,
                "Sex": user.Sex,
                "Tags": numToTAGS(user.Tags),
                "SelfIntro": user.SelfIntro,
                "Grade": user.Grade,
                "Profession": user.Profession,
                "DisplayInfo": numToDisInfo(user.DisplayInfo),
                "likedQuestion": lQ,
                "likedAnswer": lA
            })
            return JsonResponse({'data': a})
        else:
            answer.LikeNum = answer.LikeNum - 1
            answer.save()
            UserLike.objects.filter(LikeUser=user,
                                    LikeAnswer=answer,
                                    LikeType=1).delete()
            # return JsonResponse({'success': 'Delete Answer like'})
            try:
                likeQ = UserLike.objects.filter(
                    LikeUser=user, LikeType=0).values_list('LikeQuestion__QID',
                                                           flat=True)
                lQ = list(likeQ)
            except UserLike.DoesNotExist:
                lQ = []

            try:
                likeA = UserLike.objects.filter(
                    LikeUser=user, LikeType=1).values_list('LikeAnswer__AID',
                                                           flat=True)
                lA = list(likeA)
            except UserLike.DoesNotExist:
                lA = []

            a = []
            a.append({
                'UID': user.UID,
                "Image": user.Image,
                "UserName": user.UserName,
                "Sex": user.Sex,
                "Tags": numToTAGS(user.Tags),
                "SelfIntro": user.SelfIntro,
                "Grade": user.Grade,
                "Profession": user.Profession,
                "DisplayInfo": numToDisInfo(user.DisplayInfo),
                "likedQuestion": lQ,
                "likedAnswer": lA
            })
            return JsonResponse({'data': a})


# 4.7(2) 举报
def new_report(request):
    typ = int(request.GET.get('type'))
    # if (type == 0):# Question
    id = int(request.GET.get('id'))

    time = request.GET.get('reptime')
    reptime = datetime.strptime(time, FORMAT_DATETIME)
    uid = int(request.GET.get('uid'))
    reason = request.GET.get('reason')
    user = User.objects.get(UID=uid)
    report = Reported(ID=id,
                      Type=typ,
                      RepTime=reptime,
                      UID=user,
                      Reason=reason,
                      isSolved=False)
    report.save()
    return JsonResponse({'success': 'commit new request'})


# 4.8 点击问题展示
def show_question(request):
    print('into')
    qid = request.GET.get('qid')
    print('-----qid----------')
    print(qid)
    question = Question.objects.get(QID=qid)
    question.ClickNum += 1
    question.save()
    answers = Answer.objects.filter(QID=qid).order_by("-LikeNum")
    data = {}
    if answers.exists():
        data['status'] = 'success'
        data['answers'] = []
        for answer in answers:
            ans_info = {
                'AID': answer.AID,
                'AnsContent': answer.AnsContent,
                'AnsTime': answer.AnsTime,
                'LikeNum': answer.LikeNum,
                'OpenID': answer.UID.OpenID,
                'Image': answer.UID.Image,
                'UserName': answer.UID.UserName,
                'UID': answer.UID.UID
            }
            data['answers'].append(ans_info)
    else:
        # data['status'] = 'failed'
        # data['status'] = 'success'
        # data['message'] = 'No answer found for the given QID'
        data['status'] = 'success'
        data['answers'] = []
        # ans_info = {
        #     'AID': 0,
        #     'AnsContent': '',
        #     'AnsTime': '',
        #     'LikeNum': 0,
        #     'OpenID': 0,
        #     'Image': '',
        #     'UserName': '',
        #     'UID': ''
        # }
        # data['answers'].append(ans_info)
    return JsonResponse(data)


def get_Ketwords(request):

    keywords = KeyWord.objects.all()
    data = []
    for keyword in keywords:
        d = {
            'KID': keyword.KID,
            'KeyWorldContent': keyword.KeyWorldContent,
        }
        data.append(d)

    return JsonResponse({'data': data})


def numToTAGS(tag):
    tag_list = []
    if (tag & 1024) != 0:
        tag_list.append('求职')
    if (tag & 512) != 0:
        tag_list.append('考研')
    if (tag & 256) != 0:
        tag_list.append('保研')
    if (tag & 128) != 0:
        tag_list.append('指南')
    if (tag & 64) != 0:
        tag_list.append('活动')
    if (tag & 32) != 0:
        tag_list.append('失招')
    if (tag & 16) != 0:
        tag_list.append('二手')
    if (tag & 8) != 0:
        tag_list.append('情感')
    if (tag & 4) != 0:
        tag_list.append('TD')
    if (tag & 2) != 0:
        tag_list.append('航学')
    if (tag & 1) != 0:
        tag_list.append('好物')
    return tag_list


def numToDisInfo(disInfo):
    disInfo_list = []
    if (disInfo & 8) != 0:
        disInfo_list.append('Sex')
    if (disInfo & 4) != 0:
        disInfo_list.append('Profession')
    if (disInfo & 2) != 0:
        disInfo_list.append('Grade')
    if (disInfo & 1) != 0:
        disInfo_list.append('Tags')
    return disInfo_list


def tagsToNum(tags_list):
    # tags_dict = {
    #     '计算机': 32,  # 对应二进制数1000
    #     '情感': 16,
    #     '摄影': 8,  # 对应二进制数1000
    #     '艺术': 4,  # 对应二进制数0100
    #     '音乐': 2,  # 对应二进制数0010
    #     '数学': 1   # 对应二进制数0001
    # }
    tags_dict = {
        "求职": 1024,
        "考研": 512,
        "保研": 256,
        "指南": 128,
        "活动": 64,
        "失招": 32,
        "二手": 16,
        "情感": 8,
        "TD": 4,
        "航学": 2,
        "好物": 1
    }
    # print(tag_int)
    # 将所有标签对应的二进制位上的值置为1
    tag_int = 0
    # print('---------------------------------    ')
    # tag_int = sum(tags_dict[tag] for tag in tags_list if tag in tags_dict)
    for tag in tags_list:
        if tag in tags_dict:
            tag_int += tags_dict[tag]
            # print(tag)
            # print(tag_int)

    return tag_int


def displayinfoToNum(tags_list):
    tags_dict = {
        'Sex': 8,  # 对应二进制数1000
        'Profession': 4,  # 对应二进制数0100
        'Grade': 2,  # 对应二进制数0010
        'Tags': 1  # 对应二进制数0001
    }
    # 将所有标签对应的二进制位上的值置为1
    tag_int = sum(tags_dict[tag] for tag in tags_list if tag in tags_dict)

    return tag_int