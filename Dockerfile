FROM gradle:7-jdk18 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM amazoncorretto:18
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*-all.jar /app/catbot.jar
ENTRYPOINT ["java","-jar","/app/catbot.jar"]