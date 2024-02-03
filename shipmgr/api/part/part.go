// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package part

import (
	"context"

	"shipmgr/api/part/V1"
)

type IPartV1 interface {
	AddGroup(ctx context.Context, req *V1.AddGroupReq) (res *V1.AddGroupRes, err error)
	Add(ctx context.Context, req *V1.AddReq) (res *V1.AddRes, err error)
}
