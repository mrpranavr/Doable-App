import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";

const AddTaskScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [dateStringValue, setDateStringValue] = useState("");
  const [endDateStringValue, setEndDateStringValue] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleStartDateChange = (date: Date | string) => {
    setStartDate(date as Date);
    setDateStringValue(date.toString());
    setOpen(false);
  };
  const handleEndDateChange = (date: Date | string) => {
    setEndDate(date as Date);
    setEndDateStringValue(date.toString());
    setOpen(false);
  };

  const handleStartDateClose = () => {
    setOpen(false);
  };

  const handleOpenStartDatePicker = () => {
    setOpen(true);
  };
  const handleEndDateClose = () => {
    setOpenEndDatePicker(false);
  };

  const handleOpenEndDatePicker = () => {
    setOpenEndDatePicker(true);
  };

  const handleTaskTitleChange = (text: any) => {
    setTaskTitle(text);
  };

  const handleTaskDescriptionChange = (text: any) => {
    setTaskDescription(text);
  };

  return (
    <View className="bg-primary-dark flex-1 items-center px-4 gap-2 justify-between pb-14">
      <ScrollView className="w-full">
        <Text className="font-dmSansBold text-secondary-white tracking-widest text-3xl text-center">
          Create Your Task 📝
        </Text>
        <Text className="font-dmSansRegular text-secondary-white text-center tracking-widest mt-5">
          Time to get work done! Begin by filling these out.
        </Text>

        <View className="mt-9 gap-5 ">
          <CustomTextInput
            placeholder="Task Title"
            type="default"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            hasError={false}
          />
          <CustomTextInput
            placeholder="Task Description"
            type="default"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            hasError={false}
          />

          <View className="flex">
            <CustomTextInput
              placeholder="Enter Start Date"
              type="date"
              dateValue={startDate}
              onChange={handleStartDateChange}
              hasError={false}
              value={dateStringValue}
              openDatePicker={open}
              onCancelPicker={handleStartDateClose}
              onPress={handleOpenStartDatePicker}
            />
          </View>
          <CustomTextInput
            placeholder="Enter End Date"
            type="date"
            dateValue={endDate}
            onChange={handleEndDateChange}
            hasError={false}
            value={endDateStringValue}
            openDatePicker={openEndDatePicker}
            onCancelPicker={handleEndDateClose}
            onPress={handleOpenEndDatePicker}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={() => {
          console.log('Title --> ', taskTitle)
          console.log('Description --> ', taskDescription)
          console.log('Start Date --> ', startDate)
          console.log('End Date --> ', endDate)
        }}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          Create Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;
