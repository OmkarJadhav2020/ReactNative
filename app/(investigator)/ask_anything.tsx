import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef(null); 

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(async () => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Processing your request...',
        sender: 'bot',
      };

      try {
        const response = await axios.post(
          `http://192.168.148.86:5000/ask_question`,
          { question: newMessage }
        );
        botResponse.text = response.data.answer;
      } catch (error) {
        botResponse.text = 'Sorry, there was an error processing your request.';
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 500);

    setNewMessage('');
  };

  // Effect to scroll to the bottom when messages are updated
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, Team</Text>
      <Text style={styles.subHeaderText}>How can I help you today?</Text>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef} // Attach ref to ScrollView
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a prompt here"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#9C9C9C',
    textAlign: 'center',
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;