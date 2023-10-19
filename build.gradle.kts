import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.10"
    kotlin("plugin.serialization") version "1.9.10"
    application
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

application {
    mainClassName = "MainKt"
}

group = "me.yofou"
version = "6.0"

repositories {
    google()
    mavenCentral()

    maven {
        name = "Sonatype Snapshots"
        url = uri("https://s01.oss.sonatype.org/content/repositories/snapshots")
    }
}

dependencies {
    implementation("com.kotlindiscord.kord.extensions:kord-extensions:1.5.10-SNAPSHOT")
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.0")
    implementation("org.slf4j:slf4j-simple:2.0.5")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
    implementation("info.debatty:java-string-similarity:2.0.0")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.ktor:ktor-client-content-negotiation:2.3.4")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.4")
    implementation("io.ktor:ktor-client-core-jvm:2.3.4")
    implementation("io.ktor:ktor-client-cio-jvm:2.3.4")
}

tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "17"
    kotlinOptions.freeCompilerArgs += "-Xopt-in=kotlin.RequiresOptIn"
}
val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    languageVersion = "1.9"
}