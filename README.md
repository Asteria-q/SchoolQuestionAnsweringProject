# 后端

+ 后端运行：

  ```
  python manage.py runserver
  ```

  <u>注意：请修改myApp/settings.py下的DATABASE里的用户名和密码！！！！！</u>

+ 后端自动生成的管理员界面，可进行数据库的快速增删：

```
在浏览器中访问 http://localhost:8000/admin/
```

+ 对 `models.py` 文件中进行了更改后：
  1. 运行 `python manage.py makemigrations` 命令。 Django 检测到对模型的更改，并生成新的迁移文件。并自动检查models.py文件，并自动生成一个新的迁移文件。
  1. 运行 `python manage.py migrate` 命令。应用所有未应用的迁移，包括生成的新迁移。

+ 清空缓存  `python manage.py clear_cache`

+ 管理员账号：
Username: Admin         
Email address: buaa@buaa.edu.cn
Password: AdminAdmin
+ 关于接口：
  + 在**点赞**以及举报时：需要多传一个参数 ”**type**“：
    + type=0，是对question的操作
    + type=1，是对answer的操作
  + 在**按类别**进行Question浏览时：调用question/sort的路径，
    + 然后sortBy参数可以传一个uid作为默认操作
    + 同时需要一个参数i，进行”继续更多“，i从1开始