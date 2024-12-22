# Use a lightweight JDK image
FROM openjdk:18-jdk-slim

# Set the working directory
WORKDIR /note_manager_backend

# Copy the JAR file created by Maven
COPY target/note_manager_backend-0.0.1-SNAPSHOT.jar note_manager_backend.jar

# Download the wait-for-it script
RUN apt-get update && apt-get install -y curl \
    && curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /wait-for-it.sh

# Expose the application's port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["/wait-for-it.sh", "database:3306", "--", "java", "-jar", "note_manager_backend.jar"]
