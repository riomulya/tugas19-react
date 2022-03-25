import React, { Component } from "react";
import axios from "axios";
import "./style/style.css";
import { Form, Card, Button } from "react-bootstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      edit: false,
      dataPost: {
        id: 1557298991816,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
      },
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getDataId = (e) => {
    axios
      .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then((res) => {
        console.log(res);
        this.setState({ dataPost: res.data, edit: true });
      });
  };

  handleClear = () => {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["nama_karyawan"] = "";
    newdataPost["jabatan"] = "";
    newdataPost["jenis_kelamin"] = "";
    newdataPost["tanggal_lahir"] = "";
    this.setState({ dataPost: newdataPost });
  };

  handleInput(e) {
    let newdataPost = { ...this.state.dataPost };
    if (this.state.edit === false) {
      newdataPost["id"] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;
    this.setState({ dataPost: newdataPost });
  }

  handleSubmit() {
    if (this.state.edit === false) {
      axios
        .post("http://localhost:3004/data-karyawan", this.state.dataPost)
        .then(() => {
          this.handleReload();
          this.handleClear();
        });
    } else {
      axios
        .put(
          `http://localhost:3004/data-karyawan/${this.state.dataPost.id}`,
          this.state.dataPost
        )
        .then(() => {
          this.handleReload();
          this.handleClear();
        });
    }
  }

  handleRemove(e) {
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {
      method: "DELETE",
    })
      .then(() => console.warn("Data Dihapus"))
      .then(() => this.handleReload());
  }
  handleReload() {
    fetch("http://localhost:3004/data-karyawan")
      .then((response) => response.json())
      .then((res) => this.setState({ dataApi: res }));
  }

  componentDidMount() {
    this.handleReload();
  }
  render() {
    return (
      <div>
        <nav>Data Karyawan</nav>
        <center>
          <>
            <span>
              <Form className="w-75 d-flex">
                <Form.Control
                  name="nama_karyawan"
                  onChange={this.handleInput}
                  value={this.state.dataPost.nama_karyawan}
                  type="text"
                  placeholder="Masukkan Nama Karyawan"
                  className="col-input"
                />
                <Form.Control
                  name="jenis_kelamin"
                  onChange={this.handleInput}
                  value={this.state.dataPost.jenis_kelamin}
                  className="col-input"
                  type="text"
                  placeholder="Masukkan Jenis Kelamin"
                />
                <Form.Control
                  name="jabatan"
                  onChange={this.handleInput}
                  value={this.state.dataPost.jabatan}
                  className="col-input"
                  type="text"
                  placeholder="Masukkan Jabatan"
                />
                <Form.Control
                  name="tanggal_lahir"
                  onChange={this.handleInput}
                  type="date"
                  value={this.state.dataPost.tanggal_lahir}
                />
              </Form>
              <Button
                type="submit"
                onClick={this.handleSubmit}
                className="ms-2 mt-3"
              >
                Save Data
              </Button>
            </span>
          </>
          <div className="body">
            {this.state.dataApi.map((dat, index) => {
              let nama = <strong>{dat.nama_karyawan}</strong>;
              let jeniskelamin = <u>{dat.jenis_kelamin}</u>;
              let jabatan = <mark>{dat.jabatan}</mark>;
              let tanggalLahir = <em>{dat.tanggal_lahir}</em>;
              return (
                <div key={index} className="isi">
                  <Card border="primary" className="card">
                    <p>Id : {dat.id}</p>
                    <p>Nama : {nama}</p>
                    <p>Jenis Kelamin : {jeniskelamin}</p>
                    <p>Jabatan : {jabatan}</p>
                    <p>Tanggal Lahir : {tanggalLahir}</p>
                    <p>
                      <Button
                        value={dat.id}
                        onClick={this.handleRemove}
                        style={{ marginRight: "0.8rem" }}
                      >
                        Delete
                      </Button>
                      <Button value={dat.id} onClick={this.getDataId}>
                        Edit Data
                      </Button>
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </center>
      </div>
    );
  }
}
