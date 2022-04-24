package chatroom.server;

import java.time.LocalDateTime;

enum MessageType {
  USER_JOINED, USER_LEFT, USER_MESSAGE
}

class ServerMessage {

  private String content;
  private final MessageType type;
  private final String username;
  private final LocalDateTime timestamp;

  ServerMessage(String username, MessageType type) {
    this.username = username;
    this.type = type;
    timestamp = LocalDateTime.now();
  }

  ServerMessage(String content, String username) {
    this.content = content;
    this.username = username;
    type = MessageType.USER_MESSAGE;
    timestamp = LocalDateTime.now();
  }

  public String getContent() {
    return content;
  }

  public MessageType getType() {
    return type;
  }

  public String getUsername() {
    return username;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }
}
