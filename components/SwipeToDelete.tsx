import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Task } from '@/constants/Types'
import TaskCard from './TaskCard'

type SwipeToDeleteProps = {
  tasks: Task[]
}

const SwipeToDelete = ({ tasks }: SwipeToDeleteProps) => {

  const [taskList, setTaskList] = useState<Task[]>(tasks)

  const onDismiss = () => {}

  const scrollRef = useRef<ScrollView>(null)
  
  return (
    <SafeAreaView className='flex-1 bg-[#fafbff] w-full h-full'>
      <StatusBar style='auto' />
      <Text className='font-bold text-6xl my-6 pl-[5%]'>Tasks</Text>
      <ScrollView ref={scrollRef} className='flex-1'>
        {
          tasks.map((task) => (
            <TaskCard simGesture={scrollRef} task={task} key={task.id} onDismiss={onDismiss} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SwipeToDelete