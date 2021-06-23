import React, { useEffect, useState } from 'react';
import { getNodeRpcURL } from "../lib/utils";
import { Alert, Col, Space, Typography } from "antd";
import { Connection } from "@solana/web3.js";

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = getNodeRpcURL();
    
    const connection = new Connection(url);
    connection.getVersion()
    .then(version => {
      setVersion(version)
    })
    .catch(err => console.log(err))
  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Solana
            <Text code>v{version["solana-core"]}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Solana" type="error" showIcon />}
    </Col>
  );
}

export default Connect