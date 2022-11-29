FROM amazoncorretto:18

WORKDIR /app

COPY ./src/main/resources/source_files /app/src/main/resources/source_files

COPY build/libs/*-all.jar /app/catbot.jar

ENTRYPOINT ["java","-jar","/app/catbot.jar"]