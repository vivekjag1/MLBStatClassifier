FROM python:3.12.2-slim
ENV HOME /app
WORKDIR /app
ADD ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r ./requirements.txt --user
COPY . /app

ENV FLASK_ENV=production
ENV PATH=/app/.local/bin:$PATH
ARG POSTGRES_CONNECTION_STRING
ENV POSTGRES_CONNECTION_STRING $POSTGRES_CONNECTION_STRING
EXPOSE 3001

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=3001"]
