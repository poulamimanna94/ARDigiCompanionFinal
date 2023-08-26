import React from 'react'
import { Text, View, TouchableOpacity, Linking , ScrollView} from 'react-native'
import SVGLeftArrowIcon from '../assets/arrow-left-small.svg';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../utils/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const CorporateInformation = () => {
  return (
    <SafeAreaView>
      <View style={{ minHeight: height, width: '100%', backgroundColor: '#fff', }}>
        <Header title={'Corporate Information'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section1 />
            <MailToButton />
            <Section2 comm={'Tel'} number={'+49 89 3803-5491'} />
            <Section2 comm={'Fax'} number={'+49 69 6682-6664'} />
            <Section3 title={'Chairman of the Supervisory Board'} content={'Jim Hagemann Snabe'} />
            <Section4 title={'Jim Hagemann Snabe'} content1={'Roland Busch (President and CEO)'} content2={'Cedrik Neike'} content3={'Matthias Rebellius'} content4={'Ralf P. Thomas'} content5={'Judith Wiese'} />
            <Section3 title={'Registered offices'} content={'Berlin and Munich, Germany'} />
            <Section5 title={'Commercial registries'} content1={'Berlin-Charlottenburg, HRB 12300'} content2={'Munich, HRB 6684'} />
            <Section3 title={'VAT registration number'} content={'DE129274202'} />
            <Section6 title={'Responsible according to Paragraph 55, Section 2 of the German Interstate Broadcasting Agreement (Rundfunkstaatsvertrag)'} content1={'Lynette Jackson'} content2={'Siemens Aktiengesellschaft'} content3={'Communications'} content4={'Werner-von-Siemens-Straße 1'} content5={'80333 Munich'} content6={'Germany'} />
          </ScrollView>
      </View>
    </SafeAreaView>

  )
}
const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={{ height: height * 0.08, backgroundColor: '#f2f2f2', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5, marginLeft: 10, }}><SVGLeftArrowIcon /></TouchableOpacity>
      <Text style={{ position: 'absolute', left: '18%', alignSelf: 'center', fontFamily: 'SiemensSans-Bold', fontSize: 24, }}>{title}</Text>
    </View>
  )
}

const Section1 = () => {
  return (
    <View style={{ padding: 15, }}>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold' }}>Corporate Headquarters</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', marginTop: 10, }}>Siemens Aktiengesellschaft</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman' }}>Werner-von-Siemens-Straße 1</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman' }}>80333 Munich</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman' }}>Germany</Text>
    </View>
  )
}
const MailToButton = () => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 15, width: width * 0.8 }} onPress={() => Linking.openURL('mailto:contact@siemens.com')}>
      <Text style={{ textDecorationLine: 'underline', fontFamily: 'SiemensSans-Bold', fontSize: 16, }}>contact@siemens.com</Text>
    </TouchableOpacity>
  )
}

const Section2 = ({ comm, number }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 15, width: width * 0.8 }}>
      <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, marginRight: 5, }}>{comm}</Text>
      <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >{number}</Text>
    </View>
  )
}

const Section3 = ({ title, content }) => {
  return (
    <View style={{ padding: 15, }}>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content}</Text>
    </View>
  )
}

const Section5 = ({ title, content1, content2 }) => {
  return (
    <View style={{ padding: 15, }}>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content1}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content2}</Text>
    </View>
  )
}



const Section4 = ({ title, content1, content2, content3, content4, content5, content6 }) => {
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 55, }}>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content1}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content2}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content3}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content4}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content5}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content6}</Text>
    </View>
  )
}

const Section6 = ({ title, content1, content2, content3, content4, content5, content6 }) => {
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 55, marginBottom:'45%', }}>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content1}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content2}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content3}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content4}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content5}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Roman', }}>{content6}</Text>
    </View>
  )
}

export default CorporateInformation