import { Modal, Table, Radio, Button } from "@arco-design/web-react";
import { Link, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import InvoiceSend from "../components/InvoiceSend";
import InvoiceVoid from "../components/InvoiceVoid";
import { useState } from "react";

const InvoicePreview = (props) => {
  const [modalInvoiceSend, setModalInvoiceSend] = useState(false);
  const [modalInvoiceVoid, setModalInvoiceVoid] = useState(false);
  const download = () => {
    // const html = document.getElementById("InvoicePreview");

    html2canvas(document.getElementById("InvoicePreview")).then(function (
      canvas
    ) {
      const img = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const width = doc.internal.pageSize.getWidth();
      // const height = doc.internal.pageSize.getHeight();
      const imgProps = doc.getImageProperties(img);
      const height = (imgProps.height * width) / imgProps.width;
      doc.addImage(img, "PNG", 0, 0, width, height);
      doc.save("I-000001.pdf");
      // pdf.html(html, {
      //   callback: function (pdf) {
      //     pdf.save("I-000001.pdf");
      //   },
      // x: 10,
      // y: 10
      //  });
    });

    // pdf.html(html);
    // pdf.save("pdf");
  };
  function numberWithCommas(num) {
    num = Number(num);
    return num
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const columns = [
    {
      dataIndex: "index",
      title: "#",
      width: 25,
      align: "center",
      render: (col, record, index) => {
        return <div className="text-gray-300">{index + 1}</div>;
      },
    },
    {
      dataIndex: "item",
      title: "Item",
      width: 300,
    },
    {
      dataIndex: "price",
      title: "Amount (RM)",
      width: 100,
      align: "right",
      render: (col, record, index) => {
        return <div>{numberWithCommas(col)}</div>;
      },
    },
  ];

  const data = [
    {
      key: 1,
      item: "Item A",
      price: 1000,
    },
    {
      key: 2,
      item: "Item B",
      price: 1500,
    },
    {
      key: 3,
      item: "Item C",
      price: 500,
    },
  ];

  return (
    <>
      <Modal
        title="Invoice Preview"
        visible={props.visible}
        okText="Invoice Preview"
        footer={null}
        onOk={() => props.setVisible(false)}
        onCancel={() => props.setVisible(false)}
        autoFocus={false}
        focusLock={true}
        wrapClassName="full"
        className="w-full max-w-4xl"
      >
        <div
          className="overflow-auto border-b border-gray-200"
          style={{ height: `${80}vh` }}
        >
          <div style={{ width: 864 }} className="p-8" id="InvoicePreview">
            <div className="flex items-center mb-8">
              <div className="flex-1">
                <img src="/logotype.png" className="w-40" />
              </div>
              <div className="text-3xl text-right">INVOICE</div>
            </div>
            <div className="flex mb-8">
              <div className="w-80">
                <div className="text-sm font-bold text-gray-400">Bill To</div>
                <div className="font-bold">Company Name</div>
                <div>Person Name</div>
                <div>Address 1</div>
                <div>Address 2</div>
                <div>50000 Kuala Lumpur</div>
                <div>Malaysia</div>
              </div>
              <div className="text-right flex-1">
                <div className="text-sm font-bold text-gray-400">
                  Invoice Number
                </div>
                <div className="font-bold mb-2">I-0000001</div>
                <div className="text-sm font-bold text-gray-400">
                  Invoice Date
                </div>
                <div className="mb-2">1 October 2022</div>
                <div className="text-sm font-bold text-gray-400">Due Date</div>
                <div>31 October 2022</div>
              </div>
            </div>
            <Table
              size="small"
              scroll={{ x: true }}
              columns={columns}
              data={data}
              pagination={false}
              noDataElement={<div>NOTHING</div>}
              className="border-gray-300 border rounded"
              summary={(currentData) => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2} className="text-right">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="text-right">
                      {numberWithCommas(3000)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2} className="text-right">
                      Tax (6%)
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="text-right">
                      {numberWithCommas(180)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell
                      colSpan={2}
                      className="text-right font-bold"
                    >
                      Amount Due
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="text-right font-bold">
                      {numberWithCommas(3180)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
            <div className="my-8">
              <div className="text-sm font-bold text-gray-400">Notes</div>
              <div>All payment made to GoKudos Sdn Bhd</div>
            </div>
            <div className="py-4 border-t border-gray-200">
              <div>
                <span className="font-bold">Company Name</span> (2020202020202)
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div>Address 1, Address 2, 50000 Kuala Lumpur, Malaysia.</div>
                  <div>+6012 3456 789</div>
                </div>
                <div className="text-right">
                  <div>
                    <a href="mailto:email@gokudos.io">email@gokudos.io</a>
                  </div>
                  <div>
                    <a href="https//:www.gokudos.io">www.gokudos.io</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex">
            <div className="flex-1">
              <Button type="primary" onClick={() => setModalInvoiceSend(true)}>Send</Button>
              <Button onClick={download} className="ml-2">
                Download
              </Button>
            </div>
            <div>
              <Button type="text" onClick={() => setModalInvoiceVoid(true)}>Void</Button>
            </div>
          </div>
        </div>
      </Modal>
      <InvoiceSend
        visible={modalInvoiceSend}
        setVisible={setModalInvoiceSend}
      />
      <InvoiceVoid
        visible={modalInvoiceVoid}
        setVisible={setModalInvoiceVoid}
      />
    </>
  );
};
export default InvoicePreview;