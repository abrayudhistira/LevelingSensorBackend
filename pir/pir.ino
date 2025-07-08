#include <WiFi.h>
#include <HTTPClient.h>

// 1) Setup Wi‑Fi
const char* ssid     = "Redmi Note 5";
const char* password = "rumahjeruk24";

// Endpoint API
const char* serverUrl = "https://ea8f3a2a753f.ngrok-free.app/sensor/post";

// Pin SRF‑05 (5‑pin)
const int TRIG_PIN = 26;
const int ECHO_PIN = 25;

void setup() {
  Serial.begin(115200);
  delay(100);  // beri waktu serial monitor siap

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected!");
}

// Fungsi ukur jarak (cm)
long measureDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) {
    return -1;
  }
  return (duration * 0.034) / 2;
}

void loop() {
  long dist = measureDistanceCM();
  String status;
  String distanceStr;

  if (dist < 0) {
    status = "no_echo";
    distanceStr = "0";
  } else {
    status = (dist < 5) ? "full" : "not_full";
    distanceStr = String(dist);  // kirim bulat saja
  }

  Serial.printf("Distance: %ld cm → status: %s\n", dist, status.c_str());

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String payload = "{";
    payload += "\"status_leveling\":\"" + status + "\",";
    payload += "\"distance\":" + distanceStr;
    payload += "}";

    int httpCode = http.POST(payload);
    String resp = http.getString();
    Serial.printf("HTTP %d → %s\n\n", httpCode, resp.c_str());
    http.end();
  } else {
    Serial.println("WiFi disconnected!");
  }

  delay(1000);
}

