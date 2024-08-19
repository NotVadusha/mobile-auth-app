import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AuthCardProps = {
  children: string | JSX.Element | JSX.Element[];
  mainHeaderText: string;
  secondaryHeaderText: string;
  styles?: {
    card: object;
    cardHeader: object;
    cardHeaderNameText: object;
    cardHeaderBodyText: object;
  };
};

const AuthCard: FC<AuthCardProps> = ({
  children,
  mainHeaderText,
  secondaryHeaderText,
  styles = {
    card: {},
    cardHeader: {},
    cardHeaderBodyText: {},
    cardHeaderNameText: {},
  },
}) => {
  return (
    <View style={{ ...defaultStyles.card, ...styles.card }}>
      <View style={{ ...defaultStyles.cardHeader, ...styles.cardHeader }}>
        <Text
          style={{
            ...defaultStyles.cardHeaderNameText,
            ...styles.cardHeaderNameText,
          }}
        >
          {mainHeaderText}
        </Text>
        <Text
          style={{
            ...defaultStyles.cardHeaderBodyText,
            ...styles.cardHeaderBodyText,
          }}
        >
          {secondaryHeaderText}
        </Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  outCardText: {
    fontSize: 14,
    color: '#D9DFE6',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontWeight: '500',
  },
  outCardTextLink: { color: 'white' },
  cardHeader: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    gap: 18,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  card: {
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },
  cardHeaderNameText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Catamaran',
  },
  cardHeaderBodyText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontWeight: '500',
  },
  formBody: {
    gap: 24,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  inputsBody: {
    gap: 26,
  },
  buttonsContainer: {
    display: 'flex',
    gap: 8,
  },
});

export default AuthCard;
