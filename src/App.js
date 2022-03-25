import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
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

  handleInput(e) {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["id"] = new Date().getTime();
    newdataPost[e.target.name] = newdataPost[e.target.value];
  }

  handleSubmit() {
    fetch("http://localhost:3004/data-karyawan", this.state.dataPost)
      .then((response) => response.json())
      .then(() => this.handleReload());
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
        <nav
          style={{
            height: "30px",
            backgroundColor: "#3C4CAD",
            fontSize: "25px",
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            marginBottom: "1.5em",
          }}
        >
          Data Karyawan
        </nav>
        <center>
          <>
            <span>
              <input
                name="nama_karyawan"
                onChange={this.handleInput}
                value={this.state.dataPost.nama_karyawan}
                type="text"
                placeholder="Masukkan Nama Karyawan"
                style={{
                  padding: "10px",
                  margin: "10px",
                }}
              ></input>
              <input
                name="jenis_kelamin"
                onChange={this.handleInput}
                value={this.state.dataPost.jenis_kelamin}
                style={{ padding: "10px", margin: "10px" }}
                type="text"
                placeholder="Masukkan Jenis Kelamin"
              ></input>
              <input
                name="jabatan"
                onChange={this.handleInput}
                value={this.state.dataPost.jabatan}
                style={{ padding: "10px", margin: "10px" }}
                type="text"
                placeholder="Masukkan Jabatan"
              ></input>
              <input
                name="tanggal_lahir"
                onChange={this.handleInput}
                type="date"
                value={this.state.dataPost.tanggal_lahir}
              ></input>
              <button
                style={{
                  padding: "5px",
                  margin: "10px",
                  backgroundColor: "yellow",
                }}
                type="submit"
                onClick={this.handleSubmit}
              >
                Save Data
              </button>
            </span>
          </>
          <div style={{ marginTop: "50px" }}>
            {this.state.dataApi.map((data, index) => {
              let nama = <strong>{data.nama_karyawan}</strong>;
              let jeniskelamin = <u>{data.jenis_kelamin}</u>;
              let jabatan = <mark>{data.jabatan}</mark>;
              let tanggalLahir = <em>{data.tanggal_lahir}</em>;
              return (
                <span key={index}>
                  <p>Id : {data.id}</p>
                  <p>Nama : {nama}</p>
                  <p>Jenis Kelamin : {jeniskelamin}</p>
                  <p>Jabatan : {jabatan}</p>
                  <p>Tanggal Lahir : {tanggalLahir}</p>
                  <p>
                    <button value={data.id} onClick={this.handleRemove}>
                      Delete
                    </button>
                  </p>
                  <br />
                  <hr />
                </span>
              );
            })}
          </div>
        </center>
      </div>
    );
  }
}
