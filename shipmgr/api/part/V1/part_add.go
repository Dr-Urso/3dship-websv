package V1

import "github.com/gogf/gf/v2/frame/g"

type AddReq struct {
	g.Meta `path:"/part" tags:"Add" method:"post" summary:"Add part to registry"`
	Name   string `v:"required"`
	Single bool   `v:"required"`
	Script string `v:"required"`
	Mesh   int
}

type AddRes struct {
	Status bool `dc:"Status code"`
}
