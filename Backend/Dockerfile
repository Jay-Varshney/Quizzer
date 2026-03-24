# Step 1: Build stage (using Maven)
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run stage (using a tiny Java Runtime)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copies the jar from the build stage to the run stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Limits Java memory usage to prevent Render from killing the process
ENTRYPOINT ["java", "-Xmx300m", "-Xms300m", "-jar", "app.jar"]