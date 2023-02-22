import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import colors from "tailwindcss/colors";

import { Feather } from '@expo/vector-icons'

import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

interface Props extends TouchableOpacityProps {
  checked?: boolean,
  title: string
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ?
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

        </Animated.View>
        :
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }
      <Text className='text-white text-semibold ml-3 '>{title}</Text>
    </TouchableOpacity>
  )
}