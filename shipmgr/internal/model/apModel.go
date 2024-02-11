package model

type PartInput struct {
	Name     string
	Script   string
	IsSingle bool
	Mesh     int
}

type GroupInput struct {
	Name      string
	StartWith string
}

type GltfNode struct {
	Name string `json:"name"`
	Mesh int    `json:"mesh"`
}

type PartOutput struct {
	PartName    string `json:"name"`
	StatusIndex int    `json:"index"`
	AnimScript  string `json:"script"`
	ExProp      string `json:"prop"`
	IsSingle    bool   `json:"single"`
	Mesh        int    `json:"mesh"`
}

type ExtraProp struct {
	Progress int    `json:"progress"`
	Status   string `json:"status"`
}
