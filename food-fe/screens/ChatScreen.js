// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// // import socket from '../socket';
// import { useRoute } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function PrivateChat() {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const myRoute = useRoute();
//     const { userId } = myRoute.params;

//     useEffect(() => {
//         console.log("Chatting with user:", userId);
//         socket.on('private message', (msg) => {
//             setMessages((prevMessages) => [...prevMessages, msg]);
//         });

//         return () => {
//             socket.off('private message');
//         };
//     }, [userId]);

//     const sendMessage = () => {
//         const newMessage = {
//             message
//         };

//         setMessages((prevMessages) => [...prevMessages, { message, from: socket.id }]);
//         socket.emit('private message', {
//             message: message,
//             toID: userId,
//         });

//         setMessage('');
//     };

//     return (
//         <SafeAreaView>
//             <Text>Private Chat:</Text>
//             {messages.map((msg, index) => (
//                 <Text key={index}>
//                     {msg.from === socket.id ? 'You: ' : 'Other: '}{msg.message}
//                 </Text>
//             ))}

//             <TextInput
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Enter message"
//             />
//             <Button title="Send" onPress={sendMessage} />
//         </SafeAreaView>
//     );
// }