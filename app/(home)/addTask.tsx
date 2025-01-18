import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import { getSupabaseClient } from "@/utils/supabase";
import { useAuth } from "@clerk/clerk-expo";

const AddTaskScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [dateStringValue, setDateStringValue] = useState("");
  const [endDateStringValue, setEndDateStringValue] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { getToken, userId } = useAuth()

  const handleStartDateChange = (date: Date | string) => {
    setStartDate(date as Date);
    const formattedDate = (date as Date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setDateStringValue(formattedDate);
    setOpen(false);
  };

  const handleEndDateChange = (date: Date | string) => {
    setEndDate(date as Date);
    const formattedDate = (date as Date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setEndDateStringValue(formattedDate);
    setOpenEndDatePicker(false);
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

  // Handler classes for creating tasks in supabase
  const createTask = async () => {
    try {
      const supabase = await getSupabaseClient(getToken)

      const { data, error } = await supabase
      .from('Tasks')
      .insert([
        {
          user_id: userId,
          title: taskTitle,
          description: taskDescription,
          status: 'Incomplete',
          priority: 'Low',
          startDate: startDate,
          endDate: endDate
          // Add other fields as needed
        }
      ])
      .select();

      if(error) {
        console.log('Error creating task --> ', error)
      }

    } catch (error : any) {
      console.log("error while creating tasks in supabase --> ", error.message[0])
    }
  }

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
            placeholder="What is it about?"
            type="default"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            hasError={false}
          />

          <View className="flex">
            <CustomTextInput
              placeholder="When to start?"
              type="date"
              dateValue={startDate}
              onChange={handleStartDateChange}
              hasError={false}
              value={dateStringValue}
              openDatePicker={open}
              onCancelPicker={handleStartDateClose}
              onPress={handleOpenStartDatePicker}
              editable={false}
            />
          </View>
          <CustomTextInput
            placeholder="When to end?"
            type="date"
            dateValue={endDate}
            onChange={handleEndDateChange}
            hasError={false}
            value={endDateStringValue}
            openDatePicker={openEndDatePicker}
            onCancelPicker={handleEndDateClose}
            onPress={handleOpenEndDatePicker}
            editable={false}
          />

          <CustomTextInput
            placeholder="You can add more details here"
            type="default"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            hasError={false}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={() => {
          console.log("Title --> ", taskTitle);
          console.log("Description --> ", taskDescription);
          console.log("Start Date --> ", startDate);
          console.log("End Date --> ", endDate);

          createTask()
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
