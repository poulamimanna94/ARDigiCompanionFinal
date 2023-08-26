import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import SVGLeftArrowIcon from '../assets/arrow-left-small.svg';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../utils/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsOfUse = () => {
    return (
        <SafeAreaView >
            <View style={{ minHeight: height, width: '100%', backgroundColor: '#fff', }}>
                <Header title={'Terms Of Use'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                    <Section5 />
                    <Section6 />
                    <Section7 bulletPoint={7} content={'The Siemens Mobile application may contain hyperlinks to the web pages of third parties. Siemens shall have no liability for the contents of such web pages and does not make representations about or endorse such web pages or their contents as its own, as Siemens does not control the information on such web pages and is not responsible for the contents and information given thereon. The use of such web pages shall be at the sole risk of the User.'} title={'Scope'} />
                    <Section8 />
                    <Section9 />
                    <Section10 />
                    <Section11 bulletPoint={11} content={'For collection, use and processing of personally identifiable data of the User of the Siemens Mobile application, Siemens shall comply with applicable laws on data privacy protection and the Siemens Mobile application Data Protection Privacy Notice, which is available per hyperlink on the Siemens Mobile application and/or on www.siemens.com'} title={'Data privacy protection, Place of jurisdiction, Applicable law'} />
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

const Header = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={{ height: height * 0.08, flexDirection: 'row', backgroundColor: '#f2f2f2', }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginLeft: 10, alignSelf:'center', padding: 15}}><SVGLeftArrowIcon /></TouchableOpacity>
            <Text style={{  fontFamily: 'SiemensSans-Bold', fontSize: 24,alignSelf:'center', marginLeft: 80}}>{title}</Text>
        </View>
    )
}
const Section1 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>1.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Scope</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>1.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Any use of this mobile application provided by Siemens Aktiengesellschaft and/or its affiliates ("Siemens"), "Siemens Mobile application", is subject to these Terms of Use. These Terms of Use may be amended, modified or replaced by other terms and conditions, e.g. for the purchase of products and services. With log-in, or where a log-in is not required, in accessing or using the Siemens Mobile application these Terms of Use are accepted in their then current version.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>1.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >In the case of Web offers aimed at companies or public enterprises, such companies or enterprises are represented by the user and must assume that the user has appropriate knowledge and acts accordingly.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>1.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >If the User uses this Siemens Mobile application as business customer, i.e. that it is not acting for purposes which are outside its trade, business or profession, or as administration customer, § 312i para. 1 sentence 1 no. 1 - 3 of the German Civil Code does not apply.</Text>
            </View>
        </View>
    )
}

const Section2 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>2.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Services</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>2.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >This Siemens Mobile application contains specific information and software, as well as - as the case may be - related documentation, for viewing or downloading.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>2.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Siemens may stop the operation of the Siemens Mobile application in full or in part at any time. Due to the nature of the internet and computer systems, Siemens cannot accept any liability for the continuous availability of the Siemens Mobile application.</Text>
            </View>
        </View>
    )
}
const Section3 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>3.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Registration, Password</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.1</Text>
                    <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Some pages of the Siemens Mobile application may be password protected. In the interest of safety and security of the business transactions, only registered Users may access said pages. Siemens reserves the right to deny registration to any User. Siemens particularly reserves the right to determine certain sites, which were previously freely accessible, subject to registration. Siemens is entitled, at any time and without obligation to give reasons, to deny the User the right to access the password-protected area by blocking its User Data (as defined below), in particular if the User</Text>
                </View>

                <View style={{ marginLeft: 35, marginTop: 8, }}>
                    <BulletPoint content={'uses false data for the purpose of registration;'} />
                    <BulletPoint content={'violates these Terms of Use or neglects its duty of care with regard to User Data;'} />
                    <BulletPoint content={'violates any applicable laws in the access to or use of the Siemens Mobile application; or'} />
                    <BulletPoint content={'did not use the Siemens Mobile application for a longer period.'} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >For registration the User shall give accurate information and, where such information changes over time, update such information (to the extent possible: online) without undue delay. The User shall ensure that its e-mail address, as supplied to Siemens, is current at all times and an address at which the User can be contacted</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Upon registration the User will be provided with an access code, comprising a User ID and a password ("User Data"). On first access the User shall promptly change the password received from Siemens into a password known only to the User. The User Data allows the User to view or change its data or, as applicable, to withdraw its consent to data processing.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.4</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The User shall ensure that User Data is not accessible by third parties and is liable for all transactions and other activities carried out under its User Data. At the end of each online session, the User shall log-off from the password protected websites. If and to the extent the User becomes aware that third parties are misusing its User Data the User shall notify Siemens thereof without undue delay in writing, or, as the case may be, by e-mail.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.5</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >After receipt of the notice under paragraph 3.4, Siemens will deny access to the password-protected area under such User Data. Access by the User will only be possible again upon the User's application to Siemens or upon new registration.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>3.6</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The User may at any time request termination of its registration in writing, provided that the deletion will not violate the proper performance of contractual relationships. In such event Siemens will remove all user data and other stored personally identifiable data of the User as soon as these data are no longer needed.</Text>
            </View>
        </View>
    )
}

const BulletPoint = ({ content }) => {
    return (
        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start', }}>
            <Text style={{ textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 18, marginRight: 5, }}>&#8226;</Text><Text style={{ lineHeight: 20, fontFamily: 'SiemensSans-Bold', fontSize: 16, }} >{content}</Text>
        </View>
    )
}

const Section4 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>4.</Text><Text style={{ lineHeight: 20, fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Right of use to Information, Software and Documentation</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.1</Text>
                    <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The use of any information, software and documentation made available on or via this Siemens Mobile application is subject to these Terms of Use or, in case of updating information, software or documentation, subject to the applicable license terms previously agreed to with Siemens. Separately agreed to license terms, for example software downloads, shall prevail over these Terms of Use.</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Siemens grants User a non-exclusive and non-transferable license, which may not be sublicensed, to use the information, software and documentation made available to the User on or via the Siemens Mobile application to the extent agreed, or in the event of no such agreement to the extent of the purpose intended by Siemens in making same available.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Software shall be made available at no expense in object code. There shall be no right for the source code to be made available. This shall not apply to source code related to open source software, which license conditions take priority over these Terms of Use in the case of transfer of open source software and which conditions require the making available of the source code. In such case Siemens shall make the source code available in return for the payment of costs</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.4</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Information, software and documentation may not be distributed by the User to any third party at any time nor may it be rented or in any other way made available. Unless such is allowed by mandatory law, the User shall not modify the software or documentation nor shall it disassemble, reverse engineer or decompile the software or separate any part thereof. The User may make one backup copy of the software where necessary to secure further use in accordance with these Terms of Use.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.5</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The information, software and documentation are protected by copyright laws as well as international copyright treaties as well as other laws and conventions related to intellectual property. The User shall observe such laws and in particular shall not modify, conceal or remove any alphanumeric code, marks or copyright notices neither from the information nor from the software or documentation, or any copies thereof.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>4.6</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >§§ 69a et seq. of the German Copyright Law shall not be affected hereby.</Text>
            </View>
        </View>
    )
}

const Section5 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>5.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Intellectual property</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>5.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Notwithstanding the particular provisions in § 4 of these Terms of Use, information, brand names and other contents of the Siemens Mobile application may not be changed, copied, reproduced, sold, rented, used, supplemented or otherwise used in any other way without the prior written permission of Siemens</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>5.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Except for the rights of use and other rights expressly granted herein, no other rights are granted to the User nor shall any obligation be implied requiring the grant of further rights. Any and all patent rights and licenses are expressly excluded.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>5.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Siemens may, without charge, use any ideas or proposals stored by a User on the Siemens Mobile applications for the development, improvement and sale of its products.</Text>
            </View>
        </View>
    )
}

const Section6 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>6.</Text>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Duties of the User</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>6.1</Text>
                    <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >In accessing or using the Siemens Mobile application the User shall not</Text>
                </View>

                <View style={{ marginLeft: 35, marginTop: 8, }}>
                    <BulletPoint content={'breach public morality in its manner of use;'} />
                    <BulletPoint content={'violate any intellectual property right or any other proprietary right'} />
                    <BulletPoint content={'upload any contents containing a virus, so-called Trojan Horse, or any other program that could damage data'} />
                    <BulletPoint content={'transmit, store or upload hyperlinks or contents to which the User is not entitled, in particular in cases where such hyperlinks or contents are in breach of confidentiality obligations or unlawful; or'} />
                    <BulletPoint content={'distribute advertising or unsolicited e-mails (so-called "spam") or inaccurate warnings of viruses, defects or similar material and the User shall not solicit or request the participation in any lottery, snowball system, chain letter, pyramid game or similar activity'} />

                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>6.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Siemens may deny access to the Siemens Mobile application at any time, in particular if the User breaches any obligation arising from these Terms of Use.</Text>
            </View>
        </View>
    )
}

const Section7 = ({ bulletPoint, title, content }) => {
    return (
        <View style={{ padding: 25, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>{bulletPoint}.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, width: width * 0.9 }}>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >{content}</Text>
            </View>

        </View>
    )
}

const Section8 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>8.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Liability of defects for title or quality</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>8.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Insofar as any information, software or documentation is made available at no cost, any liability for defects as to quality or title of the information, software and documentation especially in relation to the correctness or absence of defects or the absence of claims or third party rights or in relation to completeness and/or fitness for purpose are excluded except for cases involving willful misconduct or fraud</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>8.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The information on the Siemens Mobile application may contain specifications or general descriptions related to the technical possibilities of individual products which may not be available in certain cases (e.g. due to product changes). The required performance of the product shall therefore be mutually agreed in each case at the time of purchase.</Text>
            </View>
        </View>
    )
}
const Section9 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>9.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Other Liability, Viruses</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>9.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The liability of Siemens for defects in relation to quality and title shall be determined in accordance with the provisions of § 8 of these Terms of Use. Any further liability of Siemens is excluded unless required by law, e.g. under the Act on Product Liability or in cases of willful misconduct, gross negligence, personal injury or death, failure to meet guaranteed characteristics, fraudulent concealment of a defect or in case of breach of fundamental contractual obligations. The damages in case of breach of fundamental contractual obligations is limited to the contract-typical, foreseeable damage if there is no willful misconduct or gross negligence.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>9.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Although Siemens makes every endeavor to keep the Siemens Mobile application free from viruses, Siemens cannot make any guarantee that it is virus-free. The User shall, for its own protection, take the necessary steps to ensure appropriate security measures and shall utilize a virus scanner before downloading any information, software or documentation.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>9.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >§§ 9.1 and 9.2 do not intend nor imply any changes to the burden of proof to the User's disadvantage.</Text>
            </View>
        </View>
    )
}

const Section10 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>10.</Text>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Duties of the User</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>6.1</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >If the User transfers information, software and documentation provided by Siemens to a third party, the User shall comply with all applicable national and international (re-) export control regulations. In any event of such transfer the User shall comply with the (re-) export control regulations of the Federal Republic of Germany, of the European Union and of the United States of America.</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>10.2</Text>
                    <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Prior to any such transfer to a third party the User shall in particular check and guarantee by appropriate measures that</Text>
                </View>

                <View style={{ marginLeft: 35, marginTop: 8, }}>
                    <BulletPoint content={'There will be no infringement of an embargo imposed by the European Union, by the United States of America and/ or by the United Nations by such transfer or by provision of other economic resources in connection with information, software and documentation provided by Siemens, also considering the limitations of domestic'} />
                    <BulletPoint content={'Such information, software and documentation provided by Siemens are not intended for use in connection with armaments, nuclear technology or weapons, if and to the extent such use is subject to prohibition or authorization, unless required authorization is provided;'} />
                    <BulletPoint content={'The regulations of all applicable Sanctioned Party Lists of the European Union and the United States of America concerning the trading with entities, persons and organizations listed therein are considered.'} />


                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>10.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >If required to enable authorities or Siemens to conduct export control checks, the User, upon request by Siemens, shall promptly provide Siemens with all information pertaining to the particular end-user, the particular destination and the particular intended use of information, software and documentation provided by Siemens, as well as any export control restrictions existing</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>10.4</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The User shall indemnify and hold harmless Siemens from and against any claim, proceeding, action, fine, loss, cost and damages arising out of or relating to any noncompliance with export control regulations by the User, and the User shall compensate Siemens for all losses and expenses resulting thereof, unless such noncompliance was not caused by fault of the User. This provision does not imply a change in burden of proof.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>10.5</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Siemens' obligation to fulfill an agreement is subject to the proviso that the fulfillment is not prevented by any impediments arising out of national and international foreign trade and customs requirements or any embargos or other sanctions.</Text>
            </View>
        </View>
    )
}

const Section12 = () => {
    return (
        <View style={{ padding: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>12.</Text><Text style={{ lineHeight: 20, fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >Right of use to Information, Software and Documentation</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>12.1</Text>
                    <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >Any supplementary agreement requires the written form.</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>12.2</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The place of jurisdiction shall be Munich if the User is a merchant in terms of the German Commercial Code (Handelsgesetzbuch).</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>12.3</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >The individual pages of the Siemens Mobile application are operated and administered by Siemens Energy AG and/or its affiliates. The pages comply with the law applicable in the country where the responsible company has its business residence. Siemens makes no representation that information, software and/or documentation on the Siemens Mobile application are appropriate or available for viewing or downloading at locations outside such country. If Users access Siemens Mobile application from outside such country, they are exclusively responsible for compliance with all applicable local laws. Access to Siemens Mobile application's information, software and/or documentation from countries where such content is unlawful is prohibited. In this case and where User seeks to do business with Siemens, the User should contact the Siemens representative for the particular country for country specific business.</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5, width: width * 0.8 }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 16, marginRight: 5, }}>12.4</Text>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >These Terms of Use shall be governed by - and all disputes relating to or in connection with these Terms of Use or their subject matter shall be resolved in accordance with - the laws of Germany, to the exclusion of its conflict of laws rules. The application of the United Nations Convention on Contracts for the International Sales of Goods (CISG) of 11 April 1980 is excluded.</Text>
            </View>

        </View>
    )
}

const Section11 = ({ bulletPoint, title, content }) => {
    return (
        <View style={{ padding: 25, marginBottom: '80%', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, marginRight: 5, }}>{bulletPoint}.</Text><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, }} >{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, width: width * 0.9 }}>
                <Text style={{ lineHeight: 20, textAlign: 'justify', fontFamily: 'SiemensSans-Roman', fontSize: 16, }} >{content}</Text>
            </View>

        </View>
    )
}


export default TermsOfUse