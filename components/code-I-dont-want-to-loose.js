 ///////////////////////////////////////////// MAYBE WILL NEED THIS CODE FOR FLEXTEND CALENDAR ////////////////////////////////////////////////////////
    //For Switch button state
    //initialize state of button to false 
    // const [switchValueDaily, setSwitchValueDaily] = useState(false);

    // //function to toggle switch 
    // const toggleSwitchDaily = () =>{
    //     //change state of the button
    //     setSwitchValueDaily(!switchValueDaily);
    // }

    // //conditional view after toggle 
    // const [MonVal, setMonVal] = useState(false);
    // const [TueVal, setTueVal] = useState(false);
    // const [WedVal, setWedVal] = useState(false);
    // const [ThuVal, setThuVal] = useState(false);
    // const [FriVal, setFriVal] = useState(false);
    // const [SatVal, setSatVal] = useState(false);
    // const [SunVal, SunThuVal] = useState(false);

    //if user decides to set reminder daily
    // const renderDailyView = () =>{
        
    //     if(switchValueDaily)
    //         return(
    //             <View>
    //                 <View style = {styles1.checkBoxRow}>
    //                     {/* List of available days  */}
    //                     <CheckBox
    //                         // center
    //                         title="Mo"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={MonVal}
    //                         onPress={() => setMonVal(!MonVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="Tu"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={TueVal}
    //                         onPress={() => setTueVal(!TueVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="We"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={WedVal}
    //                         onPress={() => setWedVal(!WedVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="Th"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={ThuVal}
    //                         onPress={() => setThuVal(!ThuVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="Fr"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={FriVal}
    //                         onPress={() => setFriVal(!FriVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="Sa"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={SatVal}
    //                         onPress={() => setSatVal(!SatVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                     <CheckBox
    //                         // center
    //                         title="Su"
    //                         checkedIcon="dot-circle-o"
    //                         uncheckedIcon="circle-o"
    //                         checked={SunVal}
    //                         onPress={() => setSunVal(!SunVal)}
    //                         size = '10'
    //                         containerStyle = {styles.dayCheckBox}
    //                     />
    //                 </View>
    //                 <View>
    //                     <TouchableOpacity onPress={() => addEventToCalendar()} style={styles.button2}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>
    //                 </View>
    //             </View>
    //         )
        
    //     return null;
    // };

    //For Switch button state
    //initialize state of button to false 
    // const [switchValueWeekly, setSwitchValueWeekly] = useState(false);

    // //function to toggle switch 
    // const toggleSwitchWeekly = () =>{
    //     //change state of button
    //     setSwitchValueWeekly(!switchValueWeekly);
    // }

    // //conditional view after toggle
    // const renderWeeklyView = () =>{
    //     if(switchValueWeekly)
    //         return(
    //             <View>
                    

    //             </View>
    //         )
        
    //     return null;
    // };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    {/* <View style={styles1.switchRow}> */}
                        {/* <Text> Daily</Text> */}
                        {/* Switch to set up Flextend calendar reminders */}
                        {/* <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={switchValueDaily ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchDaily}
                            value={switchValueDaily}
                        /> */}
                    {/* </View> */}
                    {/* This view will only show if the Flextend calendar button is toggled on */}
                    {/* {renderDailyView()}    */}
                    {/* <View style={styles1.switchRow}> */}
                        {/* <Text> Weekly</Text> */}
                        {/* Switch to set up Personal calendar reminders */}
                        {/* <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={switchValueWeekly ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchWeekly}
                            value={switchValueWeekly}
                        /> */}
                    {/* </View> */}
                    {/* This view will only show if the Flextend calendar button is toggled on */}
                    {/* {renderWeeklyView()} */}


{/* POP UP MODAL VIEW STARTS HERE */}
                {/* <Modal isVisible={isShowing} style={{backgroundColor:'white'}}>
                    <View style={{ flex: 1 }}>
                    <Text style={styles.welcome_message}>Tracking Reminders</Text>
                    <TouchableOpacity onPress={() => addEventToCalendar()} style={styles.button2}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity> */}
                {/* </View>
            </Modal> */}


            // //functions to toggle state of modal, initialized to false 
    // const [isShowing, setIsShowing] = useState(false);

    // //function to open and close modal
    // const toggleModal = () =>{
    //     setIsShowing(!isShowing);
    // }