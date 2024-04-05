import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 85vw;
  margin-left: 7.5vw;
  margin-top: 2vw;
  table-layout: fixed;
`;

export const TH = styled.th`
  font-weight: bold;
  padding: 0.5rem;
  text-align: left;
`;

export const TD = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const Str = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: center;
  text-align: center;
  flex-direction: column;
`

export const ButtonStr = styled.button`
  padding: 10px 20px;
  margin-left: 45%;
  margin-right: 45%;
  align-content: center;
  position: center;
  justify-content: center;
  background-color: grey;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;