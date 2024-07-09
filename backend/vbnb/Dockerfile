FROM openjdk:17-oracle

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

COPY src/main/resources /app/resources

ENV CLASSPATH=/app/resources

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
