import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modalize from 'react-native-modalize';
import Checkbox from 'react-native-modest-checkbox';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../../../context';
import { BottomSheetHeader } from '../../../layout';
import { ThemeStatic, Typography } from '../../../theme';
import { ThemeColors } from '../../../types';

const { FontWeights, FontSizes } = Typography;

interface OptionType {
  label?: string,
  iconName: string,
  onPress?: any,
  children?: any
};

const Option: React.FC<OptionType> = ({ label, iconName, onPress, children }) => {
  const { theme } = useContext(AppContext);

  if (children)
    return (
      <View style={styles().option}>
        <Ionicons name={iconName} size={20} color={theme.text01} />
        {children}
      </View>
    );

  return (
    <TouchableOpacity style={styles().option} activeOpacity={0.9} onPress={onPress}>
      <Ionicons name={iconName} size={20} color={theme.text01} />
      <Text style={styles(theme).optionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

interface SettingsBottomSheetType {
  ref: React.Ref<any>
};

const SettingsBottomSheet: React.FC<SettingsBottomSheetType> = React.forwardRef((props, ref) => {

  const { toggleTheme, theme } = useContext(AppContext);

  const [isChecked, setIsChecked] = useState(false);

  const onChange = ({ checked }) => {

    if (checked) toggleTheme('dark');
    else toggleTheme('light');

    setIsChecked(checked);
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Settings'
        subHeading='Themes and options'
      />
      <View style={styles().content}>
        <Option iconName='ios-color-palette'>
          <Checkbox
            labelBefore
            checked={isChecked}
            label='Dark Mode'
            onChange={onChange}
            labelStyle={styles(theme).label}
            checkedComponent={<MaterialIcons name='done' size={25} color={ThemeStatic.accent} />}
            uncheckedComponent={<MaterialIcons name='done' size={25} color={ThemeStatic.text02} />}
          />
        </Option>
        <Option label='Logout' iconName='ios-log-out' onPress={() => null} />
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingTop: 16
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    width: responsiveWidth(74),
    color: theme.text01
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  optionLabel: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01,
    marginLeft: 10
  }
});

export default SettingsBottomSheet;