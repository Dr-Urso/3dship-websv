package V1

import "github.com/gogf/gf/v2/frame/g"

type UpdateReq struct {
	g.Meta `path:"/part" tags:"Update" method:"put" summary:"Update part status"`
	Mesh   int
	ExProp string `v:"required"`
}

type UpdateRes struct {
	Status int `dc:"Status Index"`
}
