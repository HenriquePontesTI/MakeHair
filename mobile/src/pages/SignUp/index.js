import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioGroup } from 'react-native-paper'


import { View, Text, StatusBar, TextInput } from 'react-native';
import logoImg from '../../assets/logo.png';


import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import { Container, Logo, SuccessMessage, Input, ErrorMessage, Button, ButtonText, SignInLink, SignInLinkText, RadioText, RadioGroupButtonText } from './styles';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
    error: '',
    success: '',
    value: 'Cliente',
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/users', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        <StatusBar hidden />
        <Image source={logoImg} resizeMode="contain" />
        {this.state.success.length !== 0 && <Text>{this.state.success}</Text>}
        <TextInput placeholder="Nome de usuário" value={this.state.username} onChangeText={this.handleUsernameChange} autoCapitalize="none" autoCorrect={false} />
        <TextInput placeholder="Endereço de e-mail" value={this.state.email} onChangeText={this.handleEmailChange} autoCapitalize="none" autoCorrect={false} />
        <TextInput placeholder="Senha" value={this.state.password} onChangeText={this.handlePasswordChange} autoCapitalize="none" autoCorrect={false} secureTextEntry />
        <RadioButton.Group onValueChange={value => this.setState({ value })} value={this.state.value}>
          <View>
            <Text>Cliente</Text>
            <RadioButton value="Cliente" />
          </View>
          <View>
            <Text>Cabelereira</Text>
            <RadioButton value="Cabelereira" />
          </View>
        </RadioButton.Group>
        {this.state.error.length !== 0 && <Text>{this.state.error}</Text>}
        <Button onPress={this.handleSignUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignInLink onPress={this.handleBackToLoginPress}>
          <SignInLinkText>Voltar ao login</SignInLinkText>
        </SignInLink>
      </View>
    );
  }
}
