FROM python:3.9

RUN useradd -r -s /bin/bash vivek

ENV HOME /app
WORKDIR /app

ADD ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r ./requirements.txt --user

COPY . /app

RUN chown -R vivek:vivek /app

USER vivek

ENV FLASK_ENV=production
ENV PATH=/app/.local/bin:$PATH

EXPOSE 3001

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=3001"]
