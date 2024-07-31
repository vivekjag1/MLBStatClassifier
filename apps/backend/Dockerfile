FROM python:3.9

RUN useradd -r -s /bin/bash vivek 

ENV HOME /app
WORKDIR /app
ENV PATH = "/app/.local/bin:${PATH}"
RUN chown -R vivek:vivek /app
USER vivek 
ENV FLASK_ENV=production

ARG AWS_ACCESS_KEY_ID 
ARG AWS_SECRET_ACCESS_KEY 
ARG AWS_DEFAULT_REGION 

ADD ./requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r ./requirements.txt --user

COPY . ./app
WORKDIR /app

CMD . env/bin/activate && flask run --host=0.0.0.0 --port=3001
