import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import colors from "tailwindcss/colors";

export default function CustomDatePicker() {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const setInitialDate = new Date(today.setDate(today.getDate()));
  const startDate = getFormatedDate(setInitialDate, "YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(date: string) {
    setStartedDate(dayjs(date).format("DD/MM/YYYY"));
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  return (
    <View className="flex-1 items-center">
      <View className="w-full">
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-slate-200 rounded-md my-2 border border-[#113]"
          activeOpacity={0.7}
          onPress={handleOnPressStartDate}
        >
          <Text className="text-purple-600 text-2xl font-regular font-bold">
            {selectedStartDate}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para o date picker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-[#113] items-center justify-center rounded-2xl p-[35px] w-[90%]">
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChange={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "#113",
                textHeaderColor: "#fff",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#9333ea",
                mainColor: "#fff",
                textSecondaryColor: "#FFFFFF",
                borderColor: "#9333ea",
              }}
            />

            <TouchableOpacity
              onPress={handleOnPressStartDate}
              activeOpacity={0.7}
              className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md"
            >
              <Feather name="x" size={20} color={colors.white} />
              <Text className="font-bold text-base text-white ml-2">
                Concluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
