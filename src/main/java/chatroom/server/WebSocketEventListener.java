package chatroom.server;

import java.security.Principal;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

  private final SimpMessagingTemplate simpMessagingTemplate;

  public WebSocketEventListener(SimpMessagingTemplate simpMessagingTemplate) {
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @EventListener
  public void handleSessionConnected(SessionConnectedEvent event) {
    handleEvent(event.getUser(), true);
  }

  @EventListener
  public void handleSessionDisconnect(SessionDisconnectEvent event) {
    handleEvent(event.getUser(), false);
  }

  private void handleEvent(Principal userPrinciple, boolean isConnected) {
    if (userPrinciple == null) {
      throw new IllegalArgumentException();
    }

    simpMessagingTemplate.convertAndSend(
        "/topic/messages",
        new ServerMessage(userPrinciple.getName(), isConnected ? MessageType.USER_JOINED : MessageType.USER_LEFT));
  }
}
