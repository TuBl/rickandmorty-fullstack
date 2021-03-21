import { Input, Select, Button  } from 'antd';
import debounce from 'lodash.debounce'
import { useState } from 'react';
const { Option } = Select;
function InputComponent({ updateName, updateSelect}) {
  const [selectValues, setSelectValues] = useState({doa: "", gender: ""})
  const genders = ["Male", "Female", "Genderless", "Unknown"]
  const status = ["Dead", "Alive", "Unknown"]



  const handleInput = debounce((e) => updateName(e), 1000)

  const handleStatus = (value) =>{
    setSelectValues( (selectValues) => ({...selectValues, doa: value}));
  }
  const handleGender = (value) =>{
    setSelectValues( (selectValues) => ({...selectValues, gender: value}));
  }
  const handleSelect = () =>{
    updateSelect({status: selectValues.doa, gender: selectValues.gender});
    setSelectValues({doa: "", gender: ""})
  }


    return (
      <Input.Group compact>
        <Input style={{ width: '100%', marginBottom: '1rem' }}  onChange={handleInput} addonBefore="Name" id="1" defaultValue=""/>
       <div style={{ 
         width: '100%', 
         display: "flex",
         flexDirection: "column",
         background: "#eeeeee", 
         padding: "1rem", 
         paddingTop: "2rem", 
         marginBottom: '2rem'}} >
        <span style={{alignSelf: "flex-start" }} >Status</span>
       <Select
        style={{ width: '100%', marginBottom: '2rem', textAlign: "justify"}} 
        onChange={handleStatus}
        value={selectValues.doa}
        >
          {status.map((element, index) => {
             return <Option value={element} key={index}>{element}</Option>
          })}
        </Select>
        <span style={{alignSelf: "flex-start" }}>Gender</span>
        <Select 
        style={{ width: '100%', marginBottom: '2rem' , textAlign: "justify"}} 
        onChange={handleGender}
        value={selectValues.gender}
        >
          {genders.map((gender, index) => {
             return <Option value={gender} key={index}>{gender}</Option>
          })}
        </Select>
        <Button type="primary"  style={{ width: '25%', marginBottom: '2rem'}} onClick={handleSelect}>Submit</Button>
       </div>

    </Input.Group>
  );
  }
  
  export default  InputComponent    