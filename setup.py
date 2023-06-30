from setuptools import setup, find_packages

setup(
    name='huaweiProj',
    version='0.1',
    author='李鹏飞',
    author_email='20185624@buaa.edu.cn',
    description='这是我们组的软件工程项目',
    packages=find_packages(),
    install_requires=[
        'ca-certificates',
        'certifi',
        'libffi>=3.4.2',
        'openssl>=1.1.1t',
        'pip>=23.0.1',
        'python>=3.8.16',
        'setuptools>=65.6.3',
        'sqlite>=3.41.1',
        'vc>=14.2',
        'vs2015_runtime>=14.27.29016',
        'wheel>=0.38.4',
        'wincertstore>=0.2'
    ],
)
