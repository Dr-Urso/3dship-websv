package V1

import (
	"github.com/gogf/gf/v2/frame/g"
	"shipmgr/internal/model"
)

type FilterReq struct {
	g.Meta `path:"/part" tags:"Add" method:"get" summary:"Get indexed part by search param"`
	Name   string
	Mesh   int
}

type FilterRes struct {
	Data []model.PartOutput
}
