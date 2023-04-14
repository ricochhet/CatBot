import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.8.10"
    kotlin("plugin.serialization") version "1.8.10"
    application
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

application {
    mainClassName = "MainKt"
}

group = "me.yofou"
version = "6.0"

repositories {
    mavenCentral()
    maven {
        name = "Kotlin Discord"
        url = uri("https://maven.kotlindiscord.com/repository/maven-public/")
    }
}

dependencies {
    implementation("com.kotlindiscord.kord.extensions:kord-extensions:1.5.2-RC1")
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.0")
    implementation("org.slf4j:slf4j-simple:2.0.5")
    implementation("io.ktor:ktor-client-core:1.6.7")
    implementation("io.ktor:ktor-client-cio:1.6.7")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0")
    implementation("info.debatty:java-string-similarity:2.0.0")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
}

tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "17"
    kotlinOptions.freeCompilerArgs += "-Xopt-in=kotlin.RequiresOptIn"
}
val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    languageVersion = "1.8"
}