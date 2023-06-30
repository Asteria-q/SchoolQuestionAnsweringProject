import datetime
from django.urls import converters

# 定义自定义转换器
class DateTimeConverter:
    regex = r'\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}'

    def to_python(self, value):
        return datetime.datetime.strptime(value, '%Y/%m/%d %H:%M:%S')

    def to_url(self, value):
        return value.strftime('%Y/%m/%d %H:%M:%S')

# 注册自定义转换器
converters.register_converter(DateTimeConverter,'datetime')
