import React, { useState, useEffect, useRef } from "react";
import { getDataAPI, postDataAPI } from "../Redux/api";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
  ScrollView,
  TextInput,
} from "react-native";
import Distance from "../function/Distance";
import sendIcon from "../assets/icon/send.png";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Chat = ({ route }) => {
  const { userId, currentUserId } = route.params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);
  const inputRef = useRef();

  const [currentMsg, setCurrentMsg] = useState(null);
  const currentUser = useSelector((state) => state.auth);
  const fetchChats = async () => {
    try {
      setLoading(true);
      setError(null);

      const userProfile = await getDataAPI(`profile/${userId}`);
      setUser(userProfile?.user);

      const res = await getDataAPI(`getMessages/${currentUserId}/${userId}`);

      setData(res);
      console.log("Message", data);
    } catch (error) {
      console.log(error);
      setError("Error while tying to fetch conversations");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  console.log("User:", user);
  const handleSendMessage = async () => {
    if (message) {
      try {
        setCurrentMsg(message);
        setMessage(null);
        setError(null);
        setSending(true);
        const messageData = {
          senderId: currentUserId,
          receiverId: userId,
          message: message,
        };

        const res = await postDataAPI("sendMessage", messageData);
        const newChat = res.chat;
        constNewData = {
          ...data,
          newChat,
        };
        console.log("Respmse", res);
      } catch (error) {
        console.log(error);
        setError("Error sending message");
      } finally {
        setSending(false);
      }
    }
  };
  const navigation = useNavigation();
  return (
    <View className="h-screen w-screen  bg-white flex flex-1">
      <View className="h-[90vh]">
        <ScrollView className="h-full w-full ">
          <Pressable
            className="flex items-center w-full mt-2"
            onPress={() => navigation.navigate("profile", { userId: userId })}
          >
            <Image
              source={{ uri: user?.image }}
              className="w-[90px] h-[90px] rounded-full"
            />

            <Text className=" capitalize text-[18px] font-light ">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className=" capitalize text-[13px] text-gray-500 ">
              {user?.bio}
            </Text>
            <Distance
              to={user?.location}
              userLocation={currentUser?.location}
            />
          </Pressable>
          <View className="mt-2 flex items-center w-full p-5 ">
            <View className="w-full border border-gray-300 p-4 rounded-xl bg-zinc-100">
              <Text className="font-bold ">Tips</Text>
              <Text>.Buy safely during Covid </Text>
              <Text>· Agree the price upfront </Text>
              <Text>· Check seller profile before paying </Text>
              <Text>. Pay at the point of handover when buying locally </Text>
              <Text>· Ask about allergens</Text>
            </View>
          </View>
          <View className="p-2">
            {data.length > 0 &&
              data.map((msg, i) => (
                <View
                  className={`${
                    msg?.sender === currentUserId ? "ml-auto" : "mr-auto"
                  }  mb-2`}
                  key={msg._id}
                >
                  <View
                    className={`${
                      msg?.sender === currentUserId
                        ? "bg-orange-400"
                        : "bg-gray-600"
                    } mb-0  w-full p-3 rounded-xl`}
                  >
                    <Text className="text-white">{msg?.message}</Text>
                  </View>
                  <Text className="text-gray-600 text-[11px] capitalize pl-2">
                    {moment(msg?.createdAt).fromNow()}
                  </Text>
                </View>
              ))}
            {sending && (
              <View
                className="ml-auto
                w-[40%] max-w-[80%] mb-2"
              >
                <View className="mb-0 bg-orange-400 w-full p-3 rounded-xl">
                  <Text className="text-white">{currentMsg}</Text>
                </View>
                <Text className="text-gray-600 text-[11px] capitalize pl-2">
                  Sending Message....
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <KeyboardAwareScrollView>
          <View className="border-t bg-white border-gray-200 mt-5  w-full p-3  flex flex-row gap-2 items-center ">
            <TextInput
              placeholder="Message..."
              onChangeText={(text) => setMessage(text)}
              value={message}
              focusable={true}
              className="border p-2 border-gray-200 rounded-full bg-gray-200 px-4 w-[90%]"
            />
            <Pressable onPress={handleSendMessage}>
              <Image source={sendIcon} className="w-[20px] h-[20px]" />
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Chat;
