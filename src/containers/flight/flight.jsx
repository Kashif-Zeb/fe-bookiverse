import React from 'react'
import { Table,Spin,ConfigProvider } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useState ,useEffect,useMemo} from 'react'
import { sendingapiCallFlight } from './flightSlice'
import AlertCustom from "../../components/alert/alert"
import { createStyles } from 'antd-style';
import { NavLink } from 'react-router-dom'

const Flight = () => {
  const [paginationed, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
  });
  const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });
  const dispatch = useDispatch()
  const {data ,error,loading} = useSelector((state)=>state.flight.flights_data)

  const[alert,setAlert] = useState({
    type:null,
    message:"",
    visible:false
  }
)
  useEffect(()=>{
    if (error){
      setAlert({
        type:"error",
        message:error,
        visible:true
      })
    }
  },[error])
  useEffect(() => {
      if (!alert.visible) return;
      const timer = setTimeout(
        () => setAlert((a) => ({ ...a, visible: false })),
        3000
      );
      return () => clearTimeout(timer);
    }, [alert.visible]);

  useEffect(()=>{
    dispatch(sendingapiCallFlight())
  },[dispatch])
  const columns = useMemo(() => [
    // { title: 'flight_id', dataIndex: 'flight_id', key: 'id' },
    { title: 'Flight name', dataIndex: 'flight_name', key: 'flight_name',fixed:"left" },
    { title: 'Plane name', dataIndex: 'plane_name', key: 'plane_name' },
    {title:"Flight origin",dataIndex:"flight_origin",key:"flight_origin"},
    {title:"Flight departure",dataIndex:"flight_departure",key:"flight_departure"},
    {title:"Flight date",dataIndex:"flight_date",key:"flight_date"},
    {title:"Flight price",dataIndex:"flight_price",key:"flight_price"},
    {title:"Company",dataIndex:"company",key:"company"},
    {
      title: 'Action 1',
      fixed: 'right',
      width: 90,
      render: () => <NavLink to={"/kak"}>Buy</NavLink>,
    },
  ],[]);
  const theme = {
    components:{
      Table:{
        bodySortBg:'black',
        headerBg:'rgb(192, 192, 192)'
      }
    }
  }
  const handlePageChange = (page, pageSize) => {
    console.log(page,pageSize)
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  const handlePageSizeChange = (current, size) => {
    setPagination({
      current: 1, // Reset to first page when changing page size
      pageSize: size,
    });
  };
  if (loading) return <Spin style={{display:"flex",alignContent:"center",justifyContent:"center"}}/>
  return (

    <>
    <AlertCustom 
    type={alert.type}
    message={alert.message}
    visible={alert.visible}/>
    <ConfigProvider theme={theme}>

    <Table
    bordered={true}
    className={useStyle.customTable}
    columns={columns}
    dataSource={data}
    scroll={{ x: 'max-content' }}
    pagination={false}
    rowKey="flight_id"
    pagination={{
      current: paginationed.current,
      pageSize: paginationed.pageSize,
      pageSizeOptions: ['10', '20', '50', '100'],
      showSizeChanger: true,
      onChange: handlePageChange,
      onShowSizeChange: handlePageSizeChange,
    }}
    />
    </ConfigProvider>
    </>
  )
}

export default Flight