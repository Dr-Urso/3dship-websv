package V1

import "github.com/gogf/gf/v2/frame/g"

type UpdateReq struct {
	g.Meta   `path:"/part" tags:"Update" method:"put" summary:"Update part status"`
	Mesh     int
	Status   string
	Progress int
}

type UpdateRes struct {
	Status int `dc:"Status Index"`
}
