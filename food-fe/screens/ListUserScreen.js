// // mỗi hàng user là 1 UserRow, mô hình như sau:
// // mỗi user có thêm role là chủ nhà hàng, Customer
// // khi đăng nhập login sẽ dùng redux để lưu thông tin user
// // sau đó dispatch lấy inf4 user, viết api gọi data truyền vào hàm row
// import { useEffect, useState } from "react"
// import socket from '../socket';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Text, TouchableOpacity } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import UserRow from "../components/UserRow";
// function ListUserScreen() {
//     const navigation = useNavigation();
//     const [userID, setUserID] = useState([]);

//     useEffect(() => {
//         socket.emit('getAllUsers')
//         socket.on('list-users', (listUser) => {
//             setUserID(listUser);
//         });

//         return () => {
//             socket.off('list-users');
//         };
//     }, []);

//     return (
//         <SafeAreaView>
//             {userID.length > 0 ? (
//                 userID.map((userId, index) => (
//                     <TouchableOpacity
//                         key={index}
//                         onPress={() => navigation.navigate('Chat', { userId })}
//                     >
//                         <UserRow userId={userId} ></UserRow>
//                     </TouchableOpacity>
//                 ))
//             ) : (

//                 <Text>No users online</Text>
//             )}
//         </SafeAreaView>
//     );
// }
