import useCharecterList from '../hooks/useCharecterList'
import { Fragment, useState} from 'react';
import InputComponent from './InputComponent';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Pagination } from 'antd';
function CharectersList() {
  const [charecterState, setCharecter] = useState({filter: { name: "" , gender: "", status: ""}});
  const [pageState, setPage] = useState(1);
  const { loading, error, data } = useCharecterList({variables: {page: pageState, filter: charecterState.filter}});

  const handlePage = (e) =>{
    setPage(e);
  }
  const updateName = (e) => {
    let value = e.target.value;
    setCharecter( (charecterState) => ({...charecterState, filter: {name : value}}));
  }
  const updateSelect = (value) =>{
    setCharecter( (charecterState) => ({...charecterState, filter: {gender : value.gender, status: value.status}}));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>
  return(
    <Fragment>
      <InputComponent 
      updateName={(e) => updateName(e)} 
      updateSelect={(e) => updateSelect(e)}
      ></InputComponent>
      <div className="site-card-wrapper">
        <Row gutter={36}>
      {
           data.characters.results.map(({ id, name, image }) => (
             <Link to={`/charecter/${id}`} params={{id}} key={id}>
                    <Col span={48}>
                      <img src={image} alt={`${name} from the popular sitcom Rick & Morty`}/>
                      <Card title={name} bordered={false}>
                      {`${name} from the popular sitcom Rick & Morty`}
                      </Card>
                    </Col>
             </Link>
          ))
      }
        </Row>
       </div>
       <Pagination defaultCurrent={1} current={pageState} total={data.characters.info.pages} onChange={handlePage}/>
    </Fragment>
  )


}

export default CharectersList