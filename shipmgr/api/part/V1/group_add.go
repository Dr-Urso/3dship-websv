package V1

import "github.com/gogf/gf/v2/frame/g"

type AddGroupReq struct {
	g.Meta    `path:"/part/group" tags:"Add" method:"post" summary:"Add part group to registry"`
	Name      string `v:"required"`
	StartWith string `v:"required"`
}

type AddGroupRes struct {
	Status int `dc:"Status code"`
}
